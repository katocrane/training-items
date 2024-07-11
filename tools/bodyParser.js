const url=require('url')
const queryString=require('querystring')

function bodyParser(req,res,next){
    if(req.method=='GET'){
        var {query}=url.parse(req.url)
        req.body=queryString.parse(query)
        next()
    }else if(req.method=='POST'){
        var str=''
        req.on('data',(chunk)=>{
            str+=chunk
        })
        req.on('end',()=>{
            req.body=JSON.parse(str)
            next()
        })
    }
}

module.exports=bodyParser