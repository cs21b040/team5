const express = require('express');
const user=require('./mongo');
const app = express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
require('dotenv').config();
const port= process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
app.get("/login",cors(),(req,res)=>{
    res.send("Hello");        
})
app.post("/login",cors(),async(req,res)=>{
    const {email,password}=req.body;
    try{
        const check=await user.find({email:email,password:password});
        if(check){
            res.json({message:"YES"});
        }
        else{
            res.json({message:"NO"});
        }
    }
    catch(err){
        res.json({message:"NO"});
    }
})
app.post("/signup",cors(),async(req,res)=>{
    const {email,password}=req.body;
    const data={
        email:email,
        password:password
    }
    try{
        const check=await user.findOne({email:email});
        if(check){
            res.json({message:"YES"});
        }
        else{
            res.json({message:"NO"});
            await user.create(data);
        }
    }
    catch(err){
        res.json({message:"NO"});
    }
})

app.listen(27017,()=>{
    console.log(`Server is running on port 27017`);
})