const mongoose=require('./../db')

var Commend=mongoose.Schema({
    commend:String,
    fromId:String,
    data:String
})

var commend=mongoose.model('commend',Commend)

module.exports=commend
