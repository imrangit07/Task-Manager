const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const Auth = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    console.log(authHeader.startsWith('Bearer'));


    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1];
    }


    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        console.error("Error while decoding token", error);
        res.status(401).json({ message: "Token is not valid" })
    }
}

module.exports = Auth;

