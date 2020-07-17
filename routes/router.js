const route = require("express").Router();
const path = require("path")
const helper = require("../helper/helper")
const dbHelper = require("../helper/db");
const db = require("../helper/db");

route.post('/req',(req,res)=>{
    var value = helper.ipRegulate(req.body.ip)
    helper.location(value)
    .then(data=>{
        console.log("url :"+req.body.url+" ip: "+value+" date :"+req.body.date+"location"+data.data)
        var datas={
            url:req.body.url,
            ip:value,
            date:req.body.date,
            location:data.data
        }
        dbHelper.dataEntry(datas)
        .then(r=>{})
        .catch(err=>{})
    })
    .catch(err=>{console.log(err)})
})
route.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname, "/../public/dashboard.html")); 
})

route.get('/detail',(req,res)=>{
    res.sendFile(path.join(__dirname, "/../public/detail.html")); 
})
route.get('/view',(req,res)=>{
    db.collectData()
    .then(data=>{res.send(data)})
    .catch(err=>{console.log(err)})
})

module.exports = route;