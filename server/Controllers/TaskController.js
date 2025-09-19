const Auth = require("../middleware/Auth");
const { CatchAsyncErrors } = require("../middleware/CatchAsuncErrors");
const TaskModel = require("../models/TaskModel");

// For /api/tasks/create-task
const CreateTask = CatchAsyncErrors(async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;
  console.log(req.body);

  const task = new TaskModel({
    title,
    description,
    dueDate,
    priority,
    createdBy: req.user._id,
    assignedTo
  })
  await task.save();
  res.status(201).json({ message: "Task created successfully", task })
});

// For /api/tasks/all-tasks
const GetTasks = CatchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const tasks = await TaskModel.find()
    .sort({ dueDate: 1 })
    .skip(skip)
    .limit(limit)
    .populate("assignedTo", 'name email')
    .populate("createdBy", 'name');

  const total = await TaskModel.countDocuments();
  res.json({ tasks, total, page, pages: Math.ceil(total / limit) })
})

//Edit Task
const EditTask = CatchAsyncErrors(async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const { id } = req.query;

  if (!title || !description || !dueDate || !priority || !status) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

  const updatedTask = await TaskModel.findByIdAndUpdate({ _id: id }, {
    title,
    description,
    dueDate,
    priority,
    status
  },
    {
      new: true,
      runValidators: true
    });


  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  res.status(200).json({ massage: "Task Updated Successfully" })

})

//Delete Task

const DeleteTask = CatchAsyncErrors(async(req,res)=>{
  const {id}=req.query;
  const deletedTask = await TaskModel.findOneAndDelete({_id:id});

  if(!deletedTask){
    return res.status(404).json("Task not found")
  }
  res.status(200).json({message:"Task deleted successfully"})
})

const assignTaskToUser = CatchAsyncErrors(async(req,res)=>{
  const {id}=req.query;
  const {userId}=req.body;
  console.log(req.body);
  console.log(userId);
  
  console.log(id);

  const assignedTask= await TaskModel.findByIdAndUpdate({_id:id},{
    assignedTo:userId
  })

  if(!assignedTask){
    return res.status(404).json({message:"Task not found"})
  }
  
  res.status(200).json({message:"Task assigned to user successfully"})
})
module.exports = { CreateTask, GetTasks, EditTask,DeleteTask, assignTaskToUser };