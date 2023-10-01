const express = require('express');
const router = express.Router();
const {addProject,deleteProject,getProjects} = require('../Controllers/projectController');
const {protect} = require('../middleware/authMiddleware');

router.route("/").post(protect, addProject);
router.route("/").get(protect, getProjects);
router.route("/delete").delete(protect, deleteProject);

module.exports = router;