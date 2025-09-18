const express = require("express");
require("dotenv").config({path:"./config/.env"});
const ConnectDB = require("./config/ConnectDB");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

// Connecting to Database
ConnectDB()


app.use("/api/auth",require("./routes/UserRoute"));
app.use("/api/tasks",require("./routes/TaskRoute"));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});