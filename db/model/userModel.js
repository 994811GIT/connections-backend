const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please tell us your name"],
        },
        username: {
            type: String,
            required: [true, "Please enter username"],
            unique: true
        },
        contact: {
            type: String,
            required: [true, "Please provide an email id"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
            minlength: 8,
            select: true,
        },
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        loginCount : {
            type : Number,
            default : 0,
        },
        profilePicture : {
            type : String,
        },
        link : {
            type : String,
        },
        bio : {
            type : String
        },
        activeStatus :{
            type : Boolean,
        },
        category : {
            type : String
        },
        followers : {
            type : [mongoose.Schema.ObjectId],
            ref : "User",
        },
        following : {
            type : [mongoose.Schema.ObjectId],
            ref : "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema);
