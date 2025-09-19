const express = require("express");

const Auth = require("../middleware/Auth");
const {
    CreateTask,
    GetTasks,
    EditTask,
    DeleteTask,
    assignTaskToUser
} = require('../Controllers/TaskController');

const router = express.Router();

router.post("/create-task",Auth, CreateTask);
router.get("/all-tasks", GetTasks);
router.put("/edit", EditTask);
router.delete("/delete", DeleteTask);
router.put("/assign", assignTaskToUser);


module.exports = router;