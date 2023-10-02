const express = require('express');
const router = express.Router();
const {registerUser,authUser,users} = require('../Controllers/userController');
const {protect} = require('../middleware/authMiddleware');
router.route('/').post(registerUser).get(protect,users);
router.route('/login').post(authUser);
router.route('/search/:name').get(protect,users);
module.exports = router;