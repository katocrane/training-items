const express=require('express')
const app=express()
const bodyParser=require('./tools/bodyParser')
const {verifyToken}=require('./tools/token')
const cookieParser=require('cookie-parser')
app.use(express.static('./static'))
app.use(cookieParser())
app.use(bodyParser)

app.use('/',require('./router/index'))
app.use('/admin',verifyToken,require('./router/admin'))

app.listen(3000)