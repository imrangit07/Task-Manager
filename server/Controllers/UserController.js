
const {CatchAsyncErrors} = require("../middleware/CatchAsuncErrors");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken")

// For /admin/sign-up Route
const UserSignup = CatchAsyncErrors(async (req, res) => {
    const { name, email, password, role } = req.body;

    let user = await UserModel.findOne({ email: email });

    if (user) return res.status(400).json({ message: "User already exists", code: 400 });

    user = new UserModel({ name, email, password, role });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: `${req.body.name} has been created`, token, user: { id: user._id, name: user.name, email: user.email, role: user } });
});

// For /admin/sign-in Route
const UserLogin = CatchAsyncErrors(async(req,res)=>{
    const {email,password} = req.body;

    const user = await UserModel.findOne({ email: email });

    if(!user) return res.status(400).json({message:"Invalid credentials",code:400});
    const isMatch = await user.matchPassword(password);

    if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});

})


// For /admin/all-users Route
const AllUsers = async(req,res)=>{
    console.log(req.user);
    
    if(req.user.role !== 'admin') return res.status(403).json({message:"You are not allowed to access this route",code:403 });
    const users = await UserModel.find().select('-password');
    res.json(users)
}


module.exports = {UserSignup,UserLogin,AllUsers};