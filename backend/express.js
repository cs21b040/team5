const express = require('express');
require('dotenv').config();
const chats= require('./Data/data.js');
const subjects=require('./Data/Subjects.js');
const userRoutes=require('./Routes/userRoutes');
const chatRoutes=require('./Routes/chatRoutes');
const mongoDB=require('./config/db');
const app = express();
const cors=require('cors');
mongoDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
const port= process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
app.get('/',(req,res)=>{
    res.send("API success");
});
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.get("/api/chat",(req,res)=>{
    res.send(chats);
})
app.get("/api/chat/:id",(req,res)=>{
    // console.log(req.params.id);
    const singleChat=chats.find((c)=>c._id ===req.params.id);
    res.send(singleChat);
})

app.get("/subjects",(req,res)=>{
    res.send(subjects);
});