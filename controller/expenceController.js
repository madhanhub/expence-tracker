const user =require('../Schema/User')
const expence=require('../Schema/Expence')
class expenceController{
    static async Expence(
        user_id
    ){
        const expen=await new expence({user_id
        }).save()
        return expen
    }
    static async Expence_perday(
        _id,food,travel,others,total
    ){
        const perday=await expence.findOneAndUpdate({_id},
            {$push:{expence_perday:{
                food,travel,others,total
            }}})
            return perday
    }
    static async Expence_pull(
        _id,food,travel
    ){
        const e_pull=await expence.findOneAndUpdate({_id},
            {$pull:{expence_perday:{
                food,travel
            }}})
            return e_pull
    }
    static async Expence_list(
        
    ){
        const expence_list=await expence.find()
        return expence_list
    }
    static async Expence_update(
        _id,food,travel,total
    ){
        const e_update=await expence.findOneAndUpdate({_id},
            {$set:{expence_perday:{
                food,travel,total
            }}})
            return e_update
    }
    
}
module.exports=expenceController