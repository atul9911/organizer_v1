//setting up environment
require('./fixtures/environment')();

const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/User');
const {userOne,setUpDatabase} = require("./fixtures/db");

beforeEach(setUpDatabase)

 
test("should signup new user",async ()=>{
   const userOne ={
        name:"Aarav",
        email:"izafar43@gmail.com",
        password:"polo8426"
   }
    const response =await request(app)
    .post('/auth/register')
    .send(userOne)
    .expect(201);
    const {_id,password}=response.body.user;
    const user = await User.findById(_id)
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user:{
            "name":"Aarav",
            email:"izafar43@gmail.com"
        }
    })
    expect(bcrypt.compareSync("polo8426",password)).toBe(true)
});

test("should login existing user",async ()=>{
    const response =await request(app)
     .post('/auth/authenticate')
     .send({
         email:"izafar22@gmail.com",
         password:"polo8426"
     })
     .expect(200)
     
 });

 test("should not login nonexisting user",async ()=>{
    const response =await request(app)
     .post('/auth/authenticate')
     .send({
         email:"izafar@gmail.com",
         password:"polo8426"
     })
     .expect(403)
 });

 test('should update account for authenticated user',async()=>{
    let token;
    const userData={
        name:"Imran Zafar",
        email:"izafar22@gmail.com",
        password:"polo8426"
    }
    await User.deleteMany();
    const userRef=await new User(userData).save()
    const response = await request(app)
    .post('/auth/authenticate')
    .send(userData)
    token = response.body.data.token;
    const updated=await request(app)
    .put('/auth/users')
    .send({
        name:"Mariana"
    })
    .set('x-access-token',token)
    .expect(200);
})

test('should not update account for unauthenticated user',async()=>{
    let token;
    const userData={
        name:"Imran Zafar",
        email:"izafar22@gmail.com",
        password:"polo8426"
    }
    await User.deleteMany();
    const userRef=await new User(userData).save()
    const response = await request(app)
    .post('/auth/authenticate')
    .send(userData)
    token = response.body.data.token;
    const updated=await request(app)
    .put('/auth/users')
    .send({
        name:"Mariana"
    })
    .set('x-access-token','')
    .expect(401)
})

 test('should delete account for authenticated user',async()=>{
    let token;
    const userData={
        name:"Imran Zafar",
        email:"izafar22@gmail.com",
        password:"polo8426"
    }
    await User.deleteMany();
    const userRef=await new User(userData).save()
    const response = await request(app)
    .post('/auth/authenticate')
    .send(userData)
    token = response.body.data.token; 
    await request(app)
     .delete('/auth/users')
     .set('x-access-token',token)
     .expect(204)
 })