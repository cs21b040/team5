const asyncHandler = require('express-async-handler');
const {Branch,Subject} = require('../Models/BranchModel');

const getBranches = asyncHandler(async (req, res) => {
        try {   const foundlists = await Branch.find({});
                res.json(foundlists);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Server Error' });
            }         
});

const getSubjects = asyncHandler(async (req, res) => {
    const { branchName } = req.query;
    try {
      const branch = await Branch.findOne({ name: branchName });
      if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
      }
      const subs = branch.subjects;
      res.status(200).json(subs);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

const addBranch = asyncHandler(async (req, res) => {
        const {branch} = req.body;
        console.log(branch);
        const set=[];
        const NewBranch={
                name:branch,
                subjects:set
        }
        try
        {
            const NB=await Branch.create(NewBranch);
            res.status(200).send(NB);
        } catch (error)
        {
            res.status(400);
            console.log(error.message);
        }
})

const addSubject = asyncHandler(async (req, res) => {
    const { branchName, subjectName } = req.body;

    try {
        const branch = await Branch.findOne({name:branchName});
        
        if (!branch) {
            // return res.status(404).json({ message: "Branch not found" });
            console.log("Branch not found");
        }
        const newSubject = {
            name: subjectName,
            questions:[]
        };
        branch.subjects.push(newSubject);
        await branch.save();
        res.status(200).json(branch); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {getBranches,addBranch,getSubjects, addSubject};

