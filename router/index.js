const express=require('express')
const router=express.Router()

const path=require('path')
const article=require('./../bases/article')

const commend=require('./../bases/command')
const { generatorToken } = require('../tools/token')




//发送主页
router.get('/',(req,res)=>{
    res.sendFile(path.resolve('./static/home.html'))
})

//管理员登陆接口
router.get('/loginPage',(req,res)=>{
    res.sendFile(path.resolve('./static/login.html'))
})

router.post('/login',(req,res)=>{
    var {username,password}=req.body
    if(username=='admin'&&password=='666'){
        var token=generatorToken({username,password})
        res.cookie('token',token)
        res.send(JSON.stringify('登录成功'))
    }else{
        res.send(JSON.stringify('登录失败'))
    }
})
//设计访问文章接口
router.get('/getPage',(req,res)=>{
    res.sendFile(path.resolve('./static/page.html'))
})


router.get('/getNewCommendList',(req,res)=>{
    commend.find({}).sort({date:-1}).limit(5).then((result)=>{
        res.send(JSON.stringify(result))
    })
})

//设计访问文章详情接口
router.get('/getOneArticle',(req,res)=>{
    var {id}=req.body
    article.find({_id:id}).then((result)=>{
        res.send(result)
    })
})


//获取最新的一篇文章
router.get('/getArticle',(req,res)=>{
    article.find({}).sort({time:-1}).limit(1).then((result)=>{
        res.send(result)
    })
})

//设计获取热度文章列表
router.get('/getHotArticleList',(req,res)=>{
    article.find({}).sort({count:-1}).limit(5).then((result)=>{
        res.send(result)
    })
})

//获取最新的五篇文章
router.post('/getNewArticleList',(req,res)=>{
    var {groupNum}=req.body
    // console.log(req.body,'adasdasd')
    article.find({}).sort({time:-1}).skip(((groupNum-1)*5)).limit(5).then((result)=>{
        res.send(result)
    })
})
//获取分页的个数 获取所有文章个数
router.get('/getArticleNumber',(req,res)=>{
    article.find({}).then((result)=>{
        res.send(result.length.toString())
    })
})

router.get('/getCommendById',(req,res)=>{
    var {id}=req.body
    commend.find({fromId:id}).then((result)=>{
        res.send(JSON.stringify(result))
    })
})

//提交评论请求

router.post('/subcommend',(req,res)=>{
    var {value,_id}=req.body
    var newCommand=new commend({
        commend:value,
        fromId:_id,
        data:new Date().toLocaleString
    })
    newCommand.save().then(function(){
        res.send(JSON.stringify({result:'评论提交成功'}))
    })
})

module.exports=router