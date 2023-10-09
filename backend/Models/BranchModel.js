const mongoose = require("mongoose");

const AnswerSchema={
    type:mongoose.Schema.Types.ObjectId,
    PostedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    answer:String
}
const Answer=mongoose.model("Answer",AnswerSchema);


const QuestionSchema={
    question:String,
    answers:[AnswerSchema],
}
const Question=mongoose.model("Question",QuestionSchema);


const SubjectSchema={
    name:String,
    questions:[QuestionSchema]
}
const Subject = mongoose.model("Subject",SubjectSchema);


const BranchSchema={
    name:String,
    subjects:[SubjectSchema]
}
const Branch=mongoose.model("Branch",BranchSchema);

module.exports ={Branch,Subject};