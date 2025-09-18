const express = require("express");
require("dotenv").config({path:"./config/.env"});
const ConnectDB = require("./config/ConnectDB");

const app = express();

// Connecting to Database
ConnectDB()




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});