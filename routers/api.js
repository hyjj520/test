//ajax请求路由
const express=require('express');
const router=express.Router();
let User=require('../models/User');
router.post('/register',(req,resp,next)=>{
    let parms=req.body;
    if(!parms.username||!parms.password){
        console.log( req.body);
        let responseMesg={
            success:false,
            message:'用户名或密码不能为空！'
        };
        resp.json(responseMesg);
        return;
    }
    User.findOne({
        username:parms.username
    },(error,user)=>{
        if(user){
            //如果查出来了，就说明已经被注册了
            resp.json({
                success:false,
                message:'用户名已经被别人注册了！'
            });
        }else{
            //没有被查出来，说明数据库里没有这个用户名
            new User({
                 username:parms.username,
                 password:parms.password
            }).save(function(error,user){
                if(user){
                    //注册成功
                     resp.json({
                        success:true,
                        message:'注册成功！'
                    });
                }
            });
        }
    })


});
router.post('/login',(req,resp,next)=>{
    let parms=req.body;
    if(!parms.username||!parms.password){
        console.log( req.body);
        let responseMesg={
            success:false,
            message:'用户名或密码不能为空！'
        };
        resp.json(responseMesg);
        return;
    }
    User.findOne({
        username:parms.username,
        password:parms.password
    }).then((user)=>{
        if(user){
            resp.json({
                success:true,
                message:'登录成功'
            });
        }else{
            resp.json({
                success:false,
                message:'用户名或密码不正确'
            })
        }
    })


});

module.exports=router;