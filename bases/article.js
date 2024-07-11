const mongoose=require('./../db')

var Article=mongoose.Schema({
    title:String,
    content:String,
    time:String,
    classify:String,
    count:Number
})

var article=mongoose.model('article',Article)

// var newArticle=new article({
//     title:'这是15创建的文章',
//     content:'第15篇文章',
//     time:new Date().toLocaleString(),
//     classify:'体育',
//     count:1103
// })

// newArticle.save().then(()=>{
//     console.log('数据增加成功')
//     mongoose.disconnect()
// })

module.exports=article