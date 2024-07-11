const jwt=require('jsonwebtoken')
const secretKey='qwertyuiop7412689+/*-+'
function generatorToken(e){
    const token=jwt.sign(e,secretKey,{
        expiresIn:3600
    })
    return token
}

function verifyToken(req,res,next){
    const {token}=req.cookies;
    jwt.verify(token,secretKey,(err,result)=>{
        if(err){
            res.redirect('/loginPage')
        }else{
            next()
        }
    })
}
module.exports={
    generatorToken,
    verifyToken
}