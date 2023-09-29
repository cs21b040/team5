const asyncHandler = require('express-async-handler');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');
const accessChat = asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    // console.log((res.user));
    if(!userId){
        res.status(400);
        throw new Error('User id is required');
    }
    var chat = await Chat.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:userId}}},
                {users:{$elemMatch:{$eq:req.user._id}}}
            ]
        }
    ).populate("users","-password")
    .populate("latestMessage");
    chat = await User.populate(chat,
    {
        path:"latestMessage.sender",
        select:"name email pic"
    });
    if(chat.length>0){
        res.send(chat[0]);
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[userId,req.user._id]
        };
        try {
            const newChat=await Chat.create(chatData);
            const fullchat=await Chat.findOne({_id:newChat._id})
            .populate("users","-password");
            res.send(fullchat);
            res.status(200);
        } catch (error) {
            console.log(error.message);
        }
    };
});
const getChats = asyncHandler(async(req,res)=>{
    try {
        Chat.find({
            users:{$elemMatch:{$eq:req.user._id}}
        }).populate("users","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async (results)=>{
            results=await User.populate(results,
            {
                path:"latestMessage.sender",
                select:"name email pic"
            });
            res.status(200).send(results);
        })
    } catch (error) {
        res.status(400);
        console.log(error.message);
    }
});
const createGroup = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        res.status(400).send("Invalid details");
    }
    var users=JSON.parse(req.body.users);
    users.push(req.user);
    if(users.length<2){
        return res
        .status(400)
        .send("Atleast 2 users are required");
    }
    try {
        const groupChat=await Chat.create({
            chatName:req.body.name,
            isGroupChat:true,
            users:users
        });
        const fullGroupChat=await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("latestMessage");
        res.status(200).send(fullGroupChat);
    } catch (error) {
        res.status(400);
        console.log(error.message);
    }
});
const renameGroups = asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const Update=await Chat.findByIdAndUpdate(
        chatId,
        {chatName:chatName},
        {new:true}
    ).populate("users","-password")
    .populate("latestMessage");
    if(!Update){
        res.status(400);
        throw new Error('Invalid chat id');
    }
    res.status(200).json(Update);
});
const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const added=await Chat.findByIdAndUpdate(chatId,
        {
        $push:{users:userId}
        },
        {
            new:true
        });
    if(!added){
        res.status(400);
        throw new Error('Invalid chat id');
    }
    else res.status(200).json(added);
});
const removeToGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const removed=await Chat.findByIdAndUpdate(chatId,
        {
        $pull:{users:userId}
        },
        {
            new:true
        });
    if(!removed){
        res.status(400);
        throw new Error('Invalid chat id');
    }
    else res.status(200).json(removed);
});
module.exports = {accessChat,getChats,createGroup,renameGroups,addToGroup,removeToGroup};