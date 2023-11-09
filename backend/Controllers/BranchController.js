const asyncHandler = require('express-async-handler');
const {Branch,Subject,Question} = require('../Models/BranchModel');

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
        // console.log(branch);
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
const searchBranch = asyncHandler(async (req,res) =>{
  const branch = req.params.name ? {
    $or:[
      {name: {$regex:req.params.name,$options:'i'}},
    ]
  }
  :{};
  const branchlist = await Branch.find(branch);
  res.send(branchlist);
})
const deleteBranch = asyncHandler(async (req, res) => {
  const id=req.params.id;
  console.log(id)
  if(!id) {
    res.status(400).send({message:'Request missing id parameter'});
  }
  await Branch.findByIdAndDelete(id);
  res.send({message:'Branch Deleted'});
});

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

const addQuestion = asyncHandler(async (req, res) => {
    const { branchName, subjectName, question } = req.body;

    try {
        const branch = await Branch.findOne({name:branchName});
        
        if (!branch) {
            console.log("Branch not found");
        }
        const subject = branch.subjects.find((sub) => sub.name === subjectName);
        if (!subject) {
            console.log("Subject not found");
        }
        const newQuestion = {
            question: question,
            answers:[]
        };
        // await newQuestion.save();
        subject.questions.push(newQuestion);
        await branch.save();
        res.status(200).json(subject.questions); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getQuestions = asyncHandler(async (req, res) => {
    const { branchName,subjectName} = req.query;
    try {
        const branch = await Branch.findOne({ name: branchName });
        if (!branch) {
          return res.status(404).json({ message: "Branch not found" });
        }
        if(subjectName===undefined)
        {
            res.status(200).json([]);
        }
        else{
            const subject = branch.subjects.find((sub) => sub.name === subjectName);
            if (!subject) {
              return res.status(404).json({ message: "Subject not found" });
            }
            const questions = subject.questions;
            res.status(200).json(questions);
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    
});
// const getAnswers = asyncHandler(async (req, res) => {
//     const { branchName,subjectName,questionId} = req.query;
//     try {
//         const branch = await Branch.findOne({ name: branchName });
//         if (!branch) {
//           return res.status(404).json({ message: "Branch not found" });
//         }
//         const subject = branch.subjects.find((sub) => sub.name === subjectName);
//         if (!subject) {
//           return res.status(404).json({ message: "Subject not found" });
//         }
//         const question = subject.questions.find((ques) => ques.id === questionId);
//         if (!question) {
//           return res.status(404).json({ message: "Question not found" });
//         }
//         const answers = question.answers;
//         res.status(200).json(answers);
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//       }
// });

const postAnswers = asyncHandler(async (req, res) => {
    try {
        const { branchName,subjectName,questionId,answer} = req.body;
    
        const branch = await Branch.findOne({ name: branchName });
        if (!branch) {
          return res.status(404).json({ message: 'Branch not found' });
        }
        const subject = branch.subjects.find((sub) => sub.name === subjectName);
        if (!subject) {
          return res.status(404).json({ message: 'Subject not found' });
        }
        const question = subject.questions.find((ques) => ques.id === questionId);
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }

        const newAnswer = { answer:answer };
        question.answers.push(newAnswer);
        await branch.save();
        
        res.status(200).json({ message: 'Answer posted successfully' });
      } catch (error) {
        console.error('Error occurred while posting answer', error);
        res.status(500).json({ message: 'Failed to post answer' });
      }
});

const getQuestionAndAnswers = asyncHandler(async (req, res) => {
    const { branchName,subjectName,questionId} = req.query;
    try {
        const branch = await Branch.findOne({ name: branchName });
        if (!branch) {
          return res.status(404).json({ message: "Branch not found" });
        }
        const subject = branch.subjects.find((sub) => sub.name === subjectName);
        if (!subject) {
          return res.status(404).json({ message: "Subject not found" });
        }
        const question = subject.questions.find((ques) => ques.id === questionId);
        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }
        const answers = question.answers;
        res.status(200).json({question,answers});
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
});

module.exports = {getBranches,addBranch, getSubjects, addSubject, addQuestion, getQuestions,getQuestionAndAnswers,postAnswers,searchBranch,deleteBranch};

