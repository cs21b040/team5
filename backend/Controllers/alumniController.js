const asyncHandler = require('express-async-handler');
const alumni = require('../Models/alumniModel');
const User = require('../Models/userModel');

const addalumni = asyncHandler(async(req,res)=>{
    const {alumni,Company,Collage}=req.body;
    const alumniData={
        alumni,
        Company,
        Collage,
        user:req.user._id
    };
    try {
        const newalumni=await alumni.create(alumniData);
        res.status(200).send(newalumni);
    } catch (error) {
        res.status(400);
        console.log(error.message);
    }
});

const deletealumni = asyncHandler(async(req,res)=>{
    const {alumniId, userId}=req.body;
    const removealumni= await alumni.findByIdAndUpdate(alumniId,{
        $pull:{user:userId}
    },{new:true});
    res.status(200).send(removealumni);
    if(!removealumni){
        res.status(400);
        throw new Error('alumni not found');
    }
    else res.status(200).send(removealumni);
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
const getalumni = asyncHandler(async(req,res)=>{
    const alumnis=await alumni.find({}).populate('user');
    res.status(200).send(alumnis);
});

module.exports = {addalumni,deletealumni,getalumni}