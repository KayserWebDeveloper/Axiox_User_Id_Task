const mongoose = require('mongoose');

const userSchema = {
    name: String,
    mobileNumber: Number,
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

module.exports = User;