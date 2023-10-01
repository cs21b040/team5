const mongoose = require('mongoose')

const alumniModel = mongoose.Schema (
    {
        alumni:{
            type:String,
            trim:true,
            required:true
        },
        Company:{
            type:String,
            trim:true,
            required:true
        },
        Collage:{
            type:String,
            trim:true,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },
    {
        timestamps:true,
    }
);
module.exports = mongoose.model("alumniDetails",alumniModel);