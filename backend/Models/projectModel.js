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
        }
    },
    {
        timestamps:true,
    }
);
projectModel.methods.removeProject = async function(projectId){
    const Project= mongoose.model("projectDetails");
    Project.remove({_id:projectId},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Project deleted");
        }
    }
    );
},
module.exports = mongoose.model("projectDetails",projectModel);