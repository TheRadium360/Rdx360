const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Must provide name!"],
    },
    password: {
        type: String,
        required: [true, "Must provide password!"],
    },
});

adminSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
adminSchema.methods.correctPassword = async function(pass, hashPass) {
    return await bcrypt.compare(pass, hashPass);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;