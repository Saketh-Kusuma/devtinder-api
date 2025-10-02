const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async (req,res,next) => {
//Read the token
//Validate the token
try{
    const token = req.cookies.token;
    if(!token){
        throw new Error("Token Invalid")
    }
    const decodedObj = await jwt.verify(token,"DEV@TINDER$790");
    //Find the user
    const {id} = decodedObj;
    const user = await User.findOne({_id:id});
    if(!user)
    {
        throw new Error("Invalid Credentials")
    }
    req.user = user
    next();
}
catch(err){
    res.status(400).send("Error: "+err.message)
}
}
module.exports = {userAuth}