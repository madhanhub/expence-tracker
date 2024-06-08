const express=require('express')
const routes=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')

const user=require('./Schema/User')
const expence=require('./Schema/Expence')



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
        const user_register=new user({
            user_name,user_email,user_password
        }).save()
        res.status(200).json({message:'success',data:user_register})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
routes.post('/user/login',async(req,res)=>{
    try{
        const login=await user.findOne({
            user_email:req.body.user_email,
            user_password:req.body.user_password
        })
        res.status(200).json({message:'success',data:login})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
routes.post('/expence',async(req,res)=>{
    try{
        const{user_id}=req.body
        const expences=new expence({
            user_id
        }).save()
        res.status(200).json({message:'success',data:expences})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
routes.post('/expence/perday',async(req,res)=>{
    try{
        const{_id,food,travel}=req.body
        const foodCost = Number(food);
        const travelCost = Number(travel);
        const total= foodCost + travelCost 
        const expences=await expence.findOneAndUpdate({_id},
            {$push:{expence_perday:{
                food,
                travel,
                total
            }}})
            res.status(200).json({message:'success',data:expences})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
routes.post('/expence/pull',async(req,res)=>{
    try{
    
        const e_pull=await expence.findOneAndUpdate({_id:req.body._id},
            {$pull:{expence_perday:{
                food:req.body.food,
                travel:req.body.travel
            }}},
            {new:true})
            res.status(200).json({message:'success',data:e_pull})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

routes.get('/expence/list',async(req,res)=>{
    try{
        const list=await expence.find()
        res.status(200).json({message:'success',data:list})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
