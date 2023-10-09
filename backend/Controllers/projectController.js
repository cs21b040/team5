const asyncHandler = require('express-async-handler');
const Project = require('../Models/projectModel');
const User = require('../Models/userModel');
const projectDetails=require( '../Models/projectModel');
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

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.body;
    try {
      const result = await projectDetails.findByIdAndDelete(projectId);
  
      if (result === null) {
        res.status(404).send("Project not found");
      } else {
        res.status(200).send("Project deleted");
        console.log(result);
      }
    } catch (error) {
      res.status(400).send(error.message);
      console.log(error.message);
    }
  });
  
const getProjects = asyncHandler(async(req,res)=>{
    const projects=await Project.find({}).populate('user');
    res.status(200).send(projects);
});

module.exports = {addProject,deleteProject,getProjects}