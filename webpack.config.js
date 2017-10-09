
const webpack=require('webpack');
const path=require('path');//引入一个可以获取绝对的路径的模块
//用来清除文件的插件 ，每次编译前都会执行
const CleanWebpackPlugin = require('clean-webpack-plugin');
//用来将css单独提取出来的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//用来处理html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//读取本地磁盘的模块
const fs=require('fs');
//读取文件目录下的所有文件，返回一个集合
let files=fs.readdirSync('./src/html');
//读取源码下的js目录下的所有文件，返回一个集合
let plugins=[];
let JsFiles=fs.readdirSync('./src/js');//['index.js','login.js']
JsFiles=JsFiles.map(function(filename,index){
	return filename.substring(0,filename.lastIndexOf('.js'));
});//['index','login']
files.forEach((filename,index)=>{
	const moduleName=filename.substring(0,filename.lastIndexOf('.html'));
	if(JsFiles.includes(moduleName)){
		//将new的对象放入插件数组
		plugins.push(
			new HtmlWebpackPlugin({
				filename:'html/'+moduleName+'.html',
				template:'src/html/'+moduleName+'.html',
				chunks:['common','js/'+moduleName],
			})
		);
	}else{
		plugins.push(
			new HtmlWebpackPlugin({
				filename:'html/'+moduleName+'.html',
				template:'src/html/'+moduleName+'.html',
				chunks:[],
			})
		);
	}
});
const otherPlugins=[
	new CleanWebpackPlugin(['dist']),
	//提取公共文件的插件
	new webpack.optimize.CommonsChunkPlugin({
		name:'common',
		minChunks:Infinity
	}),
	//把jquery的全局变量提取出来的插件(jQuery not undefined)
	new webpack.ProvidePlugin({
		$:'jquery',
		jQuery:'jquery'
	}),

	//用来独立css文件和路径的
	new ExtractTextPlugin({
		filename: (getPath)=>{
			return getPath('css/[name].css').replace('css/js', 'css');
		},
		allChunks: true
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.UglifyJsPlugin()

];
plugins=plugins.concat(otherPlugins);
module.exports={
	//入口文件
	entry:{
		'common':['jquery','bootstrap'],
		'js/index':'./src/js/index.js',
		'js/login':'./src/js/login.js'
	},
	//出口文件
	output:{
		//指定输出后的文件目录
		path:path.resolve(__dirname,'./dist'),//注意这里只能是绝对路径
		filename:'[name].js',//指定输出后的文件名字,占位符
	},
	//插件
	plugins:plugins,
	//加载器 loader
	module:{
		rules:[
			
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		publicPath:'/'
	  },
};
