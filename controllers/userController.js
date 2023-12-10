const asyncHandler = require('express-async-handler')

//@desc register a user
//@route Post /api/user/register
//@acess public
const registerUser = asyncHandler(async(req,res)=>{
    res.json({message:"register user"});
});

//@desc login a user
//@route Post /api/user/login
//@acess public
const loginUser = asyncHandler(async(req,res)=>{
    res.json({message:"login user"});
});

//@desc get current user
//@route get /api/user/current
//@acess private
const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:"current user information"});
});


module.exports = {registerUser,loginUser,currentUser}