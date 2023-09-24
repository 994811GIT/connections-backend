const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        content : {
            type : String,
        },
        image : {
            type : [String]
        },
        user : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Post',schema)