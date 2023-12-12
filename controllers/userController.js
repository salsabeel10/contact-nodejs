const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt")
const User =  require('../models/userModel')
const jwt = require('jsonwebtoken')

//@desc register a user
//@route Post /api/user/register
//@acess public
const registerUser = asyncHandler(async(req,res)=>{
    const { username, email, password} = req.body
    if(!username||!email||!password){
       res.status(400);
       throw new Error("all fields are mandotory");
    }
    const alreadyRegister = await User.findOne({email});
    if (alreadyRegister){
        res.status(400);
       throw new Error("this email is already registerd");
    }
    //hash password
    const hashedPassword =await bcrypt.hash(password,10);
    console.log("hashed password :",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User Created ${user}`);
    if(user) {
        res.status(201).json({_id: user.id,email: user.email});
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message:"register the user"});
});

//@desc login a user
//@route Post /api/user/login
//@acess public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandotry");
    }
    const user =await User.findOne({email});
    //compare password with hashed
    if (user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN,
        {expiresIn: "16m"}
        );
        res.status(200).json({accessToken})
    } else{
        res.status(401)
        throw new Error("email or password not valid");
    }
   
});

//@desc get current user
//@route get /api/user/current
//@acess private
const currentUser = asyncHandler(async(req,res)=>{

    res.json(req.user);
});


module.exports = {registerUser,loginUser,currentUser}