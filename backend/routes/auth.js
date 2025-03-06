const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "yournext";

//Route 1: Create a User using: POST "/api/auth/createuser" No Login Required.
router.post("/createuser",[
    body("name","Enter a name more than 3 letters.").isLength({min:3}),
    body("email","Enter a valid email").isEmail(),
    body("password","Length of the password should be more than 5 letters").isLength({min:5}),
],async (req,res)=>{
    let success = false;
    //if there are errors then return bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({success,errors: errors.array()});

    try{
    //check whether the user with this email exists already.
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success,error: "Sorry a user with this email already exists"});
    }

    //encryption using hash and salt.
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt);

    //Create new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });

    //checking the authentication token through the data which provides user's id.
    const data = {
        user:{
            id: user.id
        }
    }

    //signing the jwt with secret.
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authtoken});
}
    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
});

//Route 2: Authenticate a User using: POST "/api/auth/loginuser" No Login Required
router.post("/loginuser",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password Cannot be blank").exists(),
],async (req,res)=>{
    let success = false;
    //if there are errors then return bad request and the errors.
 const errors = validationResult(req);
 if(!errors.isEmpty())
     return res.status(400).json({errors: errors.array()});


 const {email,password} = req.body;
 try {
    //matching the user's email in the database
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Try to login with correct credentials"});
    }

    //matching the password in user's database
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        success = false;
        return res.status(400).json({success,error: "Try to login with correct credentials"}); 
    }

    //checking the authentication token through the data which provides user's id.
    const data = {
        user:{
            id: user.id
        }
    }

    //signing the jwt with secret and returning auth token.
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authtoken});

 } 

    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

 
//Route 3: Get Logged in User Details using: POST "/api/auth/getuser" Login Required

router.post("/getuser",fetchuser, async (req,res)=>{

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} 

//catching any other errors.
catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

});


module.exports = router;