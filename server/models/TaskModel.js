const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{tupe:String},
    dueDate:{type:Date},
    priority:{type:String,enum:["low","medium","high"],default:'medium'},
    status:{type:String,enum:['pending','in-progress','completed'],default:"pending"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true});

module.exports = mongoose.model("Task",TaskSchema);