const express = require('express');
const router = express.Router();
const {registerUser,authUser,users} = require('../Controllers/userController');
const {protect} = require('../middleware/authMiddleware');
router.route('/').post(registerUser).get(protect,users);
router.route('/login').post(authUser);

module.exports = router;