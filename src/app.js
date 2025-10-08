require("dotenv").config();
const express = require("express");
const connectToDb = require("./config/db");
const cookieParser = require("cookie-parser")
const profile = require("./routes/profile")
const user = require("./routes/user")
const auth = require("./routes/auth")
const request = require("./routes/request")
const cors = require("cors");
const app = express();
var whitelist = ['http://localhost:5173', 'https://85c63vxc-5173.inc1.devtunnels.ms/']
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello This is Home")
})
app.use("/auth",auth)
app.use("/profile",profile)
app.use("/user",user)
app.use("/request",request)
connectToDb().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Connected to server");
   
})  
}).catch((err)=>{
 console.log("Somethin went wrong")
})