/*
app.js 入口模块 
*/
var express = require('express');

var router = require('./router');

var bodyParser = require('body-parser');

var app = express();

app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));

app.engine('html',require('express-art-template'));

//配置模板引擎在挂载路由之前 
//配置解析post请求
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(router);

app.listen(3000,function(){
    console.log('http://127.0.0.1:3000/students');
})

module.exports=app
