const User = require('../models/User');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				
const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const {MyError}= require('../config/myError');

module.exports = {
	create: async (req, res, next)=> {
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try{
			let user = await User.findOne({ email });
			if(user){
				return res.status(409)
				.json({ errors: [{ msg: 'User already exists' }] });
			}
			user = new User({
				name,
				email,
				password
			  });
			  const userData=await user.save();
			  res.status(201).json({status: "success", message: "User added successfully!!!", user:userData});
		}catch(err){
			return next(new MyError("Error in creating data",500));
		}
	},

	authenticate: async(req, res, next)=> {
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(422).json({ errors: errors.array() });
		}
		const {email,password} = req.body;
		try{
			const userInfo = await User.findOne({email});
			if(userInfo !== null && bcrypt.compareSync(password, userInfo.password)) {
				const token = jwt.sign({id: userInfo._id},process.env.JWT_SECRET, { expiresIn: '1h' }); 
				res.status(200).json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	
			   }else{
				   res.status(403).json({status:"error", message: "Invalid email/password!!!", data:null});
			   }
		}catch(err){
			return next(new MyError("Error in finding user",500));
		}
		
	},
	update:async(req,res,next)=>{
		const {name,email,password} = req.body;
		const data={}
		if(name){
			data.name=name;
		}
		if(email){
			data.email=email;
		}
		if(password){
			data.password=password;
		} 
		try{
			const updateData = await User.updateMany({_id:req.body.userId},{$set:data});
			return res.status(200).json(updateData);
		}catch(err){
            return next(new MyError("Error in updating",500));
          }

	},
	delete:async(req,res,next)=>{
		try{
			await Todo.remove({user:req.body.userId})
			const obj=await User.remove({"_id":req.body.userId});
			return res.status(204).json(obj);
		   }catch(err){
			return next(new MyError("error in deleting user",500));
		   }
	}

}					
