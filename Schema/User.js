const mongoose=require('mongoose')
const user=new mongoose.Schema({
    user_name:{
        type:String
    },
    user_email:{
        type:String,
    },
    user_password:{
        type:String
    },
    user_createAt:{
        type:Date,
        default:Date.now
    },
})
module.exports=mongoose.model('User',user)