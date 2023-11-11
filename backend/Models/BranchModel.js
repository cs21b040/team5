const mongoose = require("mongoose");

const AnswerSchema = {
    // type:mongoose.Schema.Types.ObjectId,
    answer: String,
    PostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}
const Answer = mongoose.model("Answer", AnswerSchema);


const QuestionSchema = new mongoose.Schema({
    question: String,
    PostedBy: String,
    userEmail: String,
    answers: [AnswerSchema],
    file: {
        type: Buffer,
    }
});
const Question = mongoose.model("Question", QuestionSchema);


const SubjectSchema = {
    name: String,
    questions: [QuestionSchema]
}
const Subject = mongoose.model("Subject", SubjectSchema);


const BranchSchema = {
    name: String,
    subjects: [SubjectSchema]
}
const Branch = mongoose.model("Branch", BranchSchema);

module.exports = { Branch, Subject, Question };