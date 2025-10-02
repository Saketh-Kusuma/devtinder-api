const mongoose = require("mongoose");
const connectToDb = async () =>{
   try{
     await mongoose.connect("mongodb+srv://sakethsunny65:V7kH11oeh0pJkCiI@cluster0.przwd00.mongodb.net/Devtinder");
     console.log("Connected to cluster");
   }
   catch(err){
    console.error(err.message)
   }
}
module.exports = connectToDb;