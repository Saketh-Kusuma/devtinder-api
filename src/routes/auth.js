const express = require("express");
const { validateSignupData } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const authRouter = express.Router();
const validator = require("validator")
authRouter.post("/signup",async (req,res)=>{
    try{
        validateSignupData(req.body)
        const {firstName,lastName,password,emailId,age} = req.body
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({firstName,lastName,emailId,password:passwordHash,age})
        await user.save();
        res.send("User added Successfully!")
    }
    catch(err)
    {
        res.status(404).send("Error saving the user: " + err.message);
    }
})
authRouter.post("/login",async (req,res)=>{
    const {emailId,password} = req.body
    try{
        if(!validator.isEmail(emailId))
        {
            throw new Error("Enter a valid emailId");
        }
        const userDetails = await User.findOne({emailId})
        if(userDetails){
            const isPasswordValid = await userDetails.getPasswordStatus(password)
            if(isPasswordValid)
            {   
                //create a JWT Token 
                const token = await userDetails.getJWT();
            //add token to cookie and send response to user
            res.cookie("token",token)
                res.send("Logged in succesfully")
            }
            else{
                throw new Error("Email or password is incorrect")
            }
        }
        else{
            throw new Error("Invalid credentials")
            
        }
        
    }
    catch(err)
    {
        res.status(404).send("Unable to login: " +err.message)
    }
})
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("Logged out successful")
})
module.exports = authRouter;