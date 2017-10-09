//绑定路由
const express=require('express');
const router=express.Router();

router.get('/',(req,resp,next)=>{
    //resp.send('这是首页');
    //读取views目录下的指定文件，解析并返回浏览器
    //第一个参数：表示模板的文件，相对于views目录，  views/index.html
    //第二个参数：传递给模板使用的数据
    resp.render('index');
});

router.get('/login',(req,resp,next)=>{
     resp.render('login');
});
router.get('/register',(req,resp,next)=>{
    resp.render('register');
});

module.exports=router;