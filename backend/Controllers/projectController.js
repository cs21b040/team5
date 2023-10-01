const asyncHandler = require('express-async-handler');
const Project = require('../Models/projectModel');
const User = require('../Models/userModel');

const addProject = asyncHandler(async(req,res)=>{
    const {title,professor,institute,description,abstract}=req.body;
    const projectData={
        title,
        professor,
        institute,
        description,
        abstract,
        user:req.user._id
    };
    try {
        const newProject=await Project.create(projectData);
        res.status(200).send(newProject);
    } catch (error) {
        res.status(400);
        console.log(error.message);
    }
});

const deleteProject = asyncHandler(async(req,res)=>{
    const {projectId, userId}=req.body;
    const removeProject= await Project.findByIdAndUpdate(projectId,{
        $pull:{user:userId}
    },{new:true});
    res.status(200).send(removeProject);
    if(!removeProject){
        res.status(400);
        throw new Error('Project not found');
    }
    else res.status(200).send(removeProject);
});

// const getProjects = asyncHandler(async(req,res)=>{
//     try {
//         Project.find({
//             user:{$elemMatch:{$eq:req.user._id}}
//         }).populate("user","-password")
//         .sort({updatedAt:-1})
//         .then(async (results)=>{
//             res.status(200).send(results);
//         })
//     } catch (error) {
//         console.log(error.message);
//     }
// });

//get all the projects present in the database
const getProjects = asyncHandler(async(req,res)=>{
    const projects=await Project.find({}).populate('user');
    res.status(200).send(projects);
});

module.exports = {addProject,deleteProject,getProjects}