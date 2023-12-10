const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//@desc get all contacts
//@route Get /api/contacts
//@acess public
const getContacts = asyncHandler(async(req,res)=>{
    const contacts =await Contact.find();
    res.status(200).json(contacts);
})

//@desc create contacts
//@route Post /api/contacts
//@acess public

const createContact = asyncHandler(async (req,res)=>{
    console.log("request body is:",req.body);
    const { name, email, phone} = req.body
    if(!name||!email||!phone){
       res.status(400);
       throw new Error("all fields are mandotory")
    }
    const contact =await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@desc get one contact
//@route get /api/contacts/:id
//@acess public

const getOneContact = asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found")
    }
    res.status(200).json(contact);
})

//@desc update one contact
//@route put /api/contacts/:id
//@acess public

const updateContact = asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
})

//@desc Delete one contact
//@route Delete /api/contacts/:id
//@acess public


const deleteContact = asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found")
    }
    await Contact.deleteOne()
    res.status(200).json(contact);
})

module.exports ={getContacts,getOneContact,createContact,updateContact,deleteContact}