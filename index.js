const express=require('express')
const routes=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')

const user=require('./Schema/User')
const expence=require('./Schema/Expence')
const userController = require('./controller/userController')
const expenceController=require('./controller/expenceController')



routes.use(express.json())
routes.use(morgan('dev'))
routes.use(bodyparser.json())
routes.use(express.urlencoded({ extended: true }))


routes.listen(2999,()=>{
    console.log('port run')
    mongoose.set('strictQuery', false)
	
	mongoose
		.connect(`mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/`
			
		// 	, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
)
		.then(() => {
			conn = mongoose.connection
			console.log('database Connected')
		})
		.catch((error) => {
			console.log('Error connecting to MongoDB:', error)
		})


})

routes.get('/',async(req,res)=>{
    res.send('welcome')
})
routes.post('/user/register',async(req,res)=>{
    try{
        const{user_name,user_email,user_password}=req.body
        const user_register=await userController.User_register(
            user_name,user_email,user_password
        )
        res.status(200).json({message:'user created',data:user_register})
    }catch(error){
        res.status(500).json({message:'anable to create'})
    }
})
routes.post('/user/login',async(req,res)=>{
    try{
        const{user_email,user_password}=req.body
        const login=await userController.User_login(
            user_email,user_password
        )
        res.status(200).json({message:'user login',data:login})
    }catch(error){
        res.status(500).json({message:'unable to login'})
    }
})
routes.post('/expence',async(req,res)=>{
    try{
        const {user_id}=req.body
        const expences=await expenceController.Expence(
            user_id
        )
        res.status(200).json({message:'expence pannel',data:expences})
    }catch(error){
        res.status(500).json({message:'unable to create'})
    }
})
routes.post('/expence/perday',async(req,res)=>{
    try{
        const{_id,food,travel,others}=req.body
        const foodCost = Number(food);
        const travelCost = Number(travel);
        const otherCost = Number(others);
        const total= foodCost + travelCost + otherCost
        const expences=await expenceController.Expence_perday(
            
                _id,
                food,
                travel,
                others,
                total
            )
            res.status(200).json({message:'expence added',data:expences})
    }catch(error){
        res.status(500).json({message:'unable to added '})
    }
})
routes.post('/expence/pull',async(req,res)=>{
    try{
        const{_id,food,travel}=req.body
        const e_pull=await expenceController.Expence_pull(
            _id,food,travel
        )
            res.status(200).json({message:'success',data:e_pull})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

routes.get('/expence/list',async(req,res)=>{
    try{
        const list=await expenceController.Expence_list()
        res.status(200).json({message:'success',data:list})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

routes.post('/expence/update',async(req,res)=>{
    try{
        const{_id,food,travel}=req.body
        const foodCost = Number(food);
        const travelCost = Number(travel);
        const total= foodCost + travelCost 
        const e_update=await expenceController.Expence_update(
            _id,food,travel,total
        )
            res.status(200).json({message:'success',data:e_update})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
