//引入框架
const express=require('express');
//引入模板
const swig=require('swig');
//处理前端post请求
const bodyParser = require('body-parser');
//引入数据库
const mongoose=require('mongoose');
//执行框架
const app=express();
//处理前端的POST请求的配置
//处理前端传给后端的表单格式数据（表单提交、ajax提交）  fromdata
app.use(bodyParser.urlencoded({ extended: false }));
//处理前端以json格式传给后端的数据 application/json 
app.use(bodyParser.json());
//静态资源，公共资源托管
app.use('/dist',express.static(__dirname+'/dist'));
//配置模板，第一参数模板引擎名称也是模板后缀名，第二参数处理方法
app.engine('html',swig.renderFile);
//设置模板输出目录，第一参数固定的views，第二参数目录
app.set('views','./views');
//注册模板，第一参数固定的view engine，第二参数和模板引擎名称一致
app.set('view engine','html');
//设置不缓存，开发下用，发布一定删除。
swig.setDefaults({
    cache:false
});
//引入拆分路由
app.use('/',require('./routers/main'));
app.use('/api',require('./routers/api'));
//引入
mongoose.connect('mongodb://localhost:27017/test',(error)=>{
    if(!error){
        console.log('数据库链接成功');
        //开启监听
        app.listen(8080,()=>{
            console.log('web应用启动成功');
        });
    }
})

