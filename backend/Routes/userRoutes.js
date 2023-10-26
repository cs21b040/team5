const express = require('express');
const router = express.Router();
const {registerUser,authUser,users,updateProfile} = require('../Controllers/userController');
const {protect} = require('../middleware/authMiddleware');
router.route('/').post(registerUser).get(protect,users);
router.route('/login').post(authUser);
router.route('/search/:name').get(protect,users);
router.route('/update').put(protect,updateProfile);
module.exports = router;