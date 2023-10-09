const express = require('express');
const router = express.Router();
const {getBranches, addBranch, getSubjects, addSubject} = require('../Controllers/BranchController');
const {protect} = require('../middleware/authMiddleware');

router.route("/").get(getBranches);
router.route("/").post(addBranch);
router.route("/subjects").get(getSubjects);
router.route("/subjects").post(addSubject);
module.exports = router;