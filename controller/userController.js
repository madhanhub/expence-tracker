const user =require('../Schema/User')
const expence=require('../Schema/Expence')
class userController{
    static async User_register(
        user_name,user_email,user_password,user_createAt
    ){
        const user_reg= await new user({
            user_name,user_email,user_password,user_createAt
        }).save()
        return user_reg
    }
    static async User_login(
        user_email,user_password
    ){
        const user_login=await user.findOne({user_email,user_password})
        return user_login
    }
}
module.exports=userController