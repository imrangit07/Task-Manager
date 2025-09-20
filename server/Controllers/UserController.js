
const {CatchAsyncErrors} = require("../middleware/CatchAsuncErrors");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken")

// For /api/auth/create-user Route
const CreateUser = CatchAsyncErrors(async (req, res) => {
    
    if(req.user.role !== 'admin') return res.status(403).json({message:"You are not allowed to access this route",code:403 });

    const { name, email, designation} = req.body;
    const password = "123456"
    let user = await UserModel.findOne({ email: email });

    if (user) return res.status(400).json({ message: "User already exists", code: 400 });

    user = new UserModel({ name, email, designation, password });
    await user.save();

    res.status(201).json({ message: `${req.body.name} has been created`, user: { id: user._id, name: user.name, email: user.email, role: user } });
});

// For /api/auth/sign-in Route
const UserLogin = CatchAsyncErrors(async(req,res)=>{
    const {email,password} = req.body;

    const user = await UserModel.findOne({ email: email });

    if(!user) return res.status(400).json({message:"Invalid credentials",code:400});
    const isMatch = await user.matchPassword(password);

    if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.json({message:"Login successfuly",token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});

})


// For /api/auth/all-users Route
const AllUsers = CatchAsyncErrors(async(req,res)=>{ 
    if(req.user.role !== 'admin') return res.status(403).json({message:"You are not allowed to access this route",code:403 });
    const users = await UserModel.find({role:"user"}).select('-password');
    res.json(users)
})

const DeleteUser = CatchAsyncErrors(async(req,res)=>{ 
    if(req.user.role !== 'admin') return res.status(403).json({message:"You are not allowed to access this route",code:403 });
    const {id}=req.query;
    const users = await UserModel.findByIdAndDelete({_id:id})
    res.json({message:"User Deleted Successfully"})
})


module.exports = {CreateUser,UserLogin,AllUsers,DeleteUser};