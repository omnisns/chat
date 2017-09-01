//引入express框架
var express = require('express');
//创建路由
var router = express.Router();
//引入EJS模板
var ejs = require("ejs");
//引入路径
var path = require("path");
//项目跟目录
var rooPath = path.join(__dirname,"../");
//引入文件系统模板
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get("/all",function (req,res) {
    //读取EJS文件
    fs.readFile(rooPath+"views/main.ejs",function (err,data) {
        // console.log(rooPath+"views/main.ejs");
        // console.log(data.toString());
        //模拟数据
        var datas = { title:"管理员",
            users:[
                {name:"ly",sex:"女"},
                {name:"wq",sex:"女"}
            ]};
        //将EJS文件数据添加动态数据
        var html = ejs.render(data.toString(),datas,{debug:true,filename:"main.ejs"});
        //将页面输出
        res.send(html);

    });
});



module.exports = router;