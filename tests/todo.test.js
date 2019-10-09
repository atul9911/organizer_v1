require('./fixtures/environment')();
const request = require('supertest');
const app = require('../app');
const User= require('../models/User');
const Todo= require('../models/Todo');
const {userOne,todoOne} = require("./fixtures/db");

let token,todoData;
beforeEach(async()=>{
    await User.deleteMany()
    await Todo.deleteMany()
    const user =await new User(userOne).save()
        todoData={...todoOne,user:user._id}
    await new Todo(todoData).save()
    const response =await request(app)
     .post('/auth/authenticate')
     .send({
         email:"izafar22@gmail.com",
         password:"polo8426"
     })
     .expect(200)
     token = response.body.data.token;
})

test('should fetch all todos for authenticated user',async()=>{
    const response=await request(app)
    .get('/api/v1/task')
    .set('x-access-token',token)
    .expect(200);
})

test('should not fetch all todos for unauthenticated user',async()=>{
    await request(app)
    .get('/api/v1/task/')
    .expect(401);
})

test('should fetch todo by Id for authenticated user',async()=>{
  const response=await request(app)
  .get('/api/v1/task/'+todoData._id)
  .set('x-access-token',token)
  .expect(200);
})

test('should not fetch todo by Id for unauthenticated user',async()=>{
  const response=await request(app)
  .get('/api/v1/task/'+todoData._id)
  .set('x-access-token','')
  .expect(401);
})

test('should create todo for aunthenticated user',async()=>{
    const response=await request(app)
    .post('/api/v1/task/create')
    .send({
        "item":"Go to the fish market"
    })
    .set('x-access-token',token)
    .expect(201)
    expect(response.body.item).toBe("Go to the fish market");
})

test('should not create todo for unaunthenticated user',async()=>{
    const response=await request(app)
    .post('/api/v1/task/create')
    .send({
        "item":"Go to the fish market"
    })
    .set('x-access-token',"")
    .expect(401)
})

test('should not let create todo for aunthenticated user for invalid parameters',async()=>{
    await request(app)
    .post('/api/v1/task/create')
    .set('x-access-token',token)
    .expect(422)
})

test('should delete todo for authenticated user',async()=>{
    const response=await request(app)
    .delete('/api/v1/task/destroy/'+todoData._id)
    .set('x-access-token',token)
    .expect(204)
})

test('should not delete todo for unauthenticated user',async()=>{
    const response=await request(app)
    .delete('/api/v1/task/destroy/'+todoData._id)
    .set('x-access-token','')
    .expect(401)
})

test('should update todo for authenticated user',async()=>{
 const response=await request(app)
 .put('/api/v1/task/update/'+ todoData._id)
 .send({
     "item":"go to the meeting office"
 })
 .set('x-access-token',token)
 .expect(200)
})

test('should not update todo for authenticated user for invalid parameters',async()=>{
    const response=await request(app)
    .put('/api/v1/task/update/'+ todoData._id)
    .send({
        "it":"go to the meeting office"
    })
    .set('x-access-token',token)
    .expect(422)
   })

test('should not update todo for unauthenticated user',async()=>{
    const response=await request(app)
    .put('/api/v1/task/update/'+ todoData._id)
    .send({
        "item":"go to the meeting office"
    })
    .set('x-access-token',"")
    .expect(401)
   })
   