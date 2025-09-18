const Auth = require("../middleware/Auth");
const { CatchAsyncErrors } = require("../middleware/CatchAsuncErrors");
const TaskModel = require("../models/TaskModel");

// For /api/tasks/create-task
const CreateTask = CatchAsyncErrors(async(req,res)=>{
  const {title,description,dudDate,priority,assignedTo} = req.body;
  const task = new TaskModel({
    title,
    description,
    dudDate,
    priority,
    createdBy:req.user._id,
    assignedTo
  })
  await task.save();
  res.status(201).json({message:"Task created successfully",task})
});

// For /api/task/all-tasks
const GetTasks = CatchAsyncErrors(async(req,res)=>{
    const tasks = await TaskModel.find()
    .populate("assigndTo",'name email')
    .populate("createdBy",'name');
    res.json(tasks)
})

module.exports = {CreateTask,GetTasks};