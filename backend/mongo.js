const { default: mongoose } = require('mongoose');
require('dotenv').config();
const db=mongoose.connect(process.env.temp).then(
    ()=>{
        console.log("Database connected");
    }
)
.catch((err)=>{
    console.log(err);
})

const newScheme = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const User = mongoose.model("User",newScheme);
module.exports=User;