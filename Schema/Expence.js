const mongoose=require('mongoose')
const expence=new mongoose.Schema({
    user_id:{
        type:String
    },
    expence_perday:[{
        food:{type:Number,
        default:0},
        travel:{type:Number,
        default:0},
        others:{type:String},
       
        total:{type:Number},
        createAt:{
            type:Date,
            default:Date.now
        }
    }],
})
module.exports=mongoose.model('Expence',expence)