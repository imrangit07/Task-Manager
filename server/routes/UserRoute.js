const express = require("express");
const {
    CreateUser,
    UserLogin,
    AllUsers
} = require('../Controllers/UserController');
const Auth = require("../middleware/Auth");
const router = express.Router();

router.post("/create-user", CreateUser);
router.post("/sign-in", UserLogin);
router.get("/all-users",Auth, AllUsers);

module.exports = router;