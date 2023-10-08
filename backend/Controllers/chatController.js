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
const getGroups = asyncHandler(async(req,res)=>{
    try {
        Chat.find({
            isGroupChat:true
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
})
const createGroup = asyncHandler(async(req,res)=>{
    console.log(req.body.name);
    if(!req.body.name){
        res.status(400);
        throw new Error('Invalid details');
    }
    try {
        const groupChat=await Chat.create({
            chatName:req.body.name,
            isGroupChat:true,
        });
        const fullGroupChat=await Chat.findOne({_id:groupChat._id})
        .populate("latestMessage");
        console.log(fullGroupChat);

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
module.exports = {accessChat,getChats,createGroup,renameGroups,getGroups};