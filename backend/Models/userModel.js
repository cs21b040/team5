const mongoose =require('mongoose')
const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-icon/anonymous-icon-0.jpg"
    }

},
{
    timestamps:true
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return enteredPassword=== this.password;
  };
const User=mongoose.model("User",userSchema);
module.exports = {User};