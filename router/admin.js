const express=require('express')
const router=express.Router()
const path=require('path')
const article=require('./../bases/article')
const commend=require('./../bases/command')


router.use(express.static('./static'))

// /admin
router.get('/',(req,res)=>{
    res.sendFile(path.resolve('./static/write.html'))
})

router.get('/getAllArticleList',(req,res)=>{
    article.find({}).then((result)=>{
        res.send(JSON.stringify(result))
    })
})
//删除文章接口
router.post('/deleteArticle',(req,res)=>{
    var{_id}=req.body
    article.deleteOne({_id}).then((e)=>{
        commend.deleteMany({fromId:_id}).then((e)=>{
            res.send(JSON.stringify('文章及评论删除成功'))
        })
    })
})



//添加文章接口
router.post('/addArticle',(req,res)=>{
    var{title,classify,content}=req.body
    var a=new article({
        title:title,
        content:content,
        classify:classify,
        time:new Date().toLocaleString(),
        count:0
    })
    a.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})




module.exports=router