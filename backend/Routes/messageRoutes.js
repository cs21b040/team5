const express = require('express');
const router = express.Router();
const {sendMessage,allMessages,downloadFile} = require('../Controllers/messageController');
const {protect} = require('../middleware/authMiddleware');
router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessages);
router.route('/download/:messageId').get(protect,downloadFile);
module.exports = router;