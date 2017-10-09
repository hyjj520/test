const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    username:String,
    password:String
});
let User=mongoose.model('User',userSchema);

router.get('/save',(req,resp,next)=>{
    let user=new User({
        username:'zhangsnan'+Math.random(),
        password:'123456'
    });
    user.save((error,user)=>{
        if(!error){
            console.log('注册成功');
            resp.send('注册成功');
        }
    })
    
})
module.exports=router;