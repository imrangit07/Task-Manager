const express = require("express");
const {
    CreateUser,
    UserLogin,
    AllUsers,
    DeleteUser
} = require('../Controllers/UserController');
const Auth = require("../middleware/Auth");
const router = express.Router();

router.post("/create-user", Auth, CreateUser);
router.post("/sign-in", UserLogin);
router.get("/all-users",Auth, AllUsers);
router.delete("/delete",Auth, DeleteUser);

module.exports = router;