/**
 * Created by TYRANT on 2017/9/4.
 */
//引入express框架
var express = require('express');
//创建路由
var router = express.Router();
//引入mongodb
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
//数据库连接
mongoose.connect("mongodb://localhost:27017/synchea",{useMongoClient:true});
//连接状态
var connection = mongoose.connection;

connection.on("error",function () {
    console.log("启动失败") ;
});

connection.on("open",function () {
    console.log("启动成功") ;
});
//创建表格式
var schema = mongoose.Schema({
    name:String,
    age:Number,
    sex:String
},{collection:"user",versionKey:false});

//创建模型
var model = mongoose.model("user",schema);
//添加对象
router.all("/save",function () {
    //创建对象
    var user = new model({name:"ly",age:25,sex:"女"});
    //添加
    user.save(function (err) {
        if (err)
            console.log("添加失败");
        else
            console.log("添加成功");
    });
});
//查询所有
router.all("/query",function(){
    model.find(function (err,data) {
        if (err)
            console.log("查询失败");
        else
            console.log(data);
    });

});
//查询女生
router.all("/queryWoman",function () {
    model.find({sex:"女"},function (err,data) {
        if (err)
            console.log("查询失败");
        else
            console.log(data);
    });
});
//更新
router.all("/update",function () {
    //第一参数 修改条件 第二个参数 修改内容
    model.update({sex:"男"},{name:"雷雨"},function (err) {
        if (err)
            console,log("修改失败");
        else
            console.log("修改成功");
    })
});
//删除
router.all("/remove",function () {
    model.remove({_id:"59ad361d29240127fc33ba0c"},function (err) {
        if (err)
            console,log("删除失败");
        else
            console.log("删除成功");
    });
});
//分页
router.all("/limit",function () {
    //查询所有
    var findAll = model.find();
    //设置分页，不能连写
    //起始页
    findAll.skip(0);
    //偏移量
    findAll.limit(2);
    //排序
    findAll.sort({age:1});
    findAll.exec(function (err,data) {
        if (err)
            console.log("查询失败");
        else
            console.log(data);
    });
});
module.exports = router;