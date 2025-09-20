const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    designation:{type:String}
}, { timeseries: true });

UserSchema.pre('save', async function (next) {
    //generate a hash using the password and the salt
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//method to compare the password with a candidate
UserSchema.methods.matchPassword = async function (candidate) {
    return await bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model("User", UserSchema)