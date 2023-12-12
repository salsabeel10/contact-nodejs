const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add user name"]
    },
    email: {
        type: String,
        required: [true,"Please add user email"]
    },
    password: {
        type: String,
        required: [true,"Please add Strong Password"],
        unique: [true],
    }
},
    {
        timestamps: true,
});

module.exports = mongoose.model("User",userSchema)