const express = require('express');
const router = express.Router();
const {addalumni,deletealumni,getalumni} = require('../Controllers/alumniController');
const {protect} = require('../middleware/authMiddleware');
router.route("/").post(protect, addalumni);
router.route("/").get(protect, getalumni);
router.route("/delete").delete(protect, deletealumni);

module.exports = router;