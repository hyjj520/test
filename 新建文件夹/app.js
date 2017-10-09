//引入框架
const express=require('express');
//引入模板
const swig=require('swig');
//执行框架
const app=express();
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
//绑定路由
app.get('/',(req,resp,next)=>{
    //resp.send('这是首页');
    //读取views目录下的指定文件，解析并返回浏览器
    //第一个参数：表示模板的文件，相对于views目录，  views/index.html
    //第二个参数：传递给模板使用的数据
    resp.render('index');
});

app.get('/login',(req,resp,next)=>{
     resp.render('login');
});


//开启监听
app.listen(8080,()=>{
    console.log('web应用启动成功');
})