const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();
const {accessChat,getChats,createGroup,renameGroups,addToGroup,removeToGroup} = require('../Controllers/chatController');
router.route("/").post(protect,accessChat);
router.route("/").get(protect,getChats);

router.route("/group").post(protect,createGroup);
router.route("/rename").put(protect,renameGroups);
router.route("/groupadd").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeToGroup);

module.exports =router;