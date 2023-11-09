const express = require('express');
const router = express.Router();
const {getBranches, addBranch, getSubjects, addSubject, addQuestion, getQuestions,getQuestionAndAnswers, postAnswers,searchBranch,deleteBranch} = require('../Controllers/BranchController');
const {protect} = require('../middleware/authMiddleware');

router.route("/").get(getBranches);
router.route("/").post(addBranch);
router.route("/subjects").get(getSubjects);
router.route("/subjects").post(addSubject);
router.route("/subjects/questions").post(addQuestion);
router.route("/subjects/questions").get(getQuestions);
router.route("/subjects/questions/answers").get(getQuestionAndAnswers);
router.route("/subjects/questions/answers").post(postAnswers);
router.route("/search/:name").get(searchBranch);
router.route("/delete/:id").delete(deleteBranch);
module.exports = router;