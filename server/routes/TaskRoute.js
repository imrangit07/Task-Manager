const express = require("express");

const Auth = require("../middleware/Auth");
const {
    CreateTask,
    GetTasks,
    EditTask,
    DeleteTask,
    assignTaskToUser,
    UserTasks,
    ChangeTaskStatus
} = require('../Controllers/TaskController');

const router = express.Router();

router.post("/create-task",Auth, CreateTask);
router.get("/all-tasks", GetTasks);
router.put("/edit", Auth, EditTask);
router.delete("/delete",Auth, DeleteTask);
router.put("/assign", Auth, assignTaskToUser);
router.get("/user-task",Auth,UserTasks)
router.patch("/change-status",Auth,ChangeTaskStatus)


module.exports = router;