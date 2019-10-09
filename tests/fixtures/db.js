const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Todo = require('../../models/Todo');
const userOneId= new mongoose.Types.ObjectId()
const todoOneId = new mongoose.Types.ObjectId()
const userOne = {
    "_id":userOneId,
    "name":"Imran Zafar",
    "email":"izafar22@gmail.com",
    "password":"polo8426",
    "tokens":[
        {
            token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
        }
    ]
}
// const todoOneId = new mongoose.Types.ObjectId()
const todoOne={
  "_id":todoOneId,
    "item":"go to the meeting in atlanta meeting room",
    "user":userOneId
}


const setUpDatabase = async(done) => {
  await User.deleteMany()
  await new User(userOne).save()
  done()
}

const setUpTodo= async(done)=>{
    await User.deleteMany()
    await Todo.deleteMany()
    await new User(userOne).save()
    await new Todo(todoOne).save()
    done();
}

module.exports={
    userOne,
    userOneId,
    todoOne,
    setUpDatabase,
    setUpTodo
}