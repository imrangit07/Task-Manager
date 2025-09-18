const express = require("express");
const {
    UserSignup,
    UserLogin,
    AllUsers
} = require('../Controllers/UserController');
const Auth = require("../middleware/Auth");
const router = express.Router();

router.post("/sign-up", UserSignup);
router.post("/sign-in", UserLogin);
router.get("/all-users",Auth, AllUsers);

module.exports = router;