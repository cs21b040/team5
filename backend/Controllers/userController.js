const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../config/generateToken');
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,collegeName,userType,password,pic,displine,branch,graduationyear,workingas,company,highestDegreeOfQualification} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("Please fill all the details");
    }
    const user = await User.create({
        name,email,collegeName,userType,password,pic,displine,branch,graduationyear,workingas,company,highestDegreeOfQualification
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            collegeName:user.collegeName,
            userType:user.userType,
            password:user.password,
            pic:user.pic,
            discipline:user.discipline,
            branch:user.branch,
            graduationyear:user.graduationyear,
            workingas:user.workingas,
            company:user.company,
            highestDegreeOfQualification:user.highestDegreeOfQualification,
            token:generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid User Data");
    }
});
const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        collegeName:user.collegeName,
        userType:user.userType,
        password:user.password,
        pic:user.pic,
        graduationyear:user.graduationyear,
        discipline:user.discipline,
        branch:user.branch,
        workingas:user.workingas,
        company:user.company,
        highestDegreeOfQualification:user.highestDegreeOfQualification,
        token:generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

const users = asyncHandler(async (req,res)=>{
    const user = req.query.search ? {
        $or:[
            {name : {$regex:req.query.search,$options:'i'}},
            {email : {$regex:req.query.search,$options:'i'}},
        ],
    }
    :{};
    const userlist = await User.find(user).find({_id:{$ne:req.user._id}});
    res.send(userlist);
})
const updateProfile = asyncHandler(async (req,res)=>{ 
    const {userObj,name,graduatedYear,branch,discipline,highestDegreeOfQualification,Workedin,Workingin,pic}=req.body;
    const update=await User.findByIdAndUpdate(
        userObj._id,
        {name:name},
        
        {graduatedYear:graduatedYear},
        
        {branch:branch},

        {discipline:discipline},
        
        {highestDegreeOfQualification:highestDegreeOfQualification},
        
        {Workedin:Workedin},

        {Workingin:Workingin},

        {pic:pic}

    ).populate("")


})
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
module.exports = {registerUser,authUser,users,updateProfile};