const express = require("express");
const {
    CreateTask
} = require('../Controllers/TaskController');
const Auth = require("../middleware/Auth");
const router = express.Router();

router.post("/create-task",Auth, CreateTask);
router.get("/all-tasks", CreateTask);


module.exports = router;