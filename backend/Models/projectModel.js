const mongoose = require('mongoose')

const projectModel = mongoose.Schema (
    {
        title:{
            type:String,
            trim:true,
            required:true
        },
        professor:{
            type:String,
            trim:true,
            required:true
        },
        institute:{
            type:String,
            trim:true,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        abstract:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        file:{
            type:Buffer,
        },
        fileName:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
module.exports = mongoose.model("projectDetails",projectModel);