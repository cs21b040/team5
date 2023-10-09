const express = require('express');
const router = express.Router();
const {getBranches, addBranch, getSubjects, addSubject, addQuestion, getQuestions} = require('../Controllers/BranchController');
const {protect} = require('../middleware/authMiddleware');

router.route("/").get(getBranches);
router.route("/").post(addBranch);
router.route("/subjects").get(getSubjects);
router.route("/subjects").post(addSubject);
router.route("/subjects/questions").post(addQuestion);
router.route("/subjects/questions").get(getQuestions);
module.exports = router;