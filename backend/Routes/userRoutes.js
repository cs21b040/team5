const express = require('express');
const router = express.Router();
const {registerUser,authUser,users,updateProfile,updateOpenMsg,banUser,getCnt,getBanned} = require('../Controllers/userController');
const {protect} = require('../middleware/authMiddleware');
router.route('/').post(registerUser).get(protect,users);
router.route('/login').post(authUser);
router.route('/search/:name').get(protect,users);
router.route('/update').put(protect,updateProfile);
router.route('/openMsg').put(protect,updateOpenMsg);
router.route('/delete/:id').put(protect,banUser);
router.get('/usertypes/count', getCnt);
router.get('/banned', getBanned)
module.exports = router;