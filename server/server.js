const express=require('express')
const app=express()
const cors=require('cors')
const sequelize=require('./database/sql')
const table=require('./model/form')
const bodyParser=require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.post('/delete',async(req,res,next)=>{
    console.log(req.body)
    const del = await table.findByPk(req.body.id)
    del.destroy()
    res.json('DELETE REQUEST SUCCESSFULL')
})
app.post('/post',async(req,res,next)=>{
    let name=req.body.name
    let email=req.body.email
    let phone=req.body.phone
    const Data = await table.create({name,email,phone})
    res.json({userDetails:Data})
})
app.get('/',async(req,res,next)=>{
    const users = await table.findAll().then(result=>result).catch(err=>{console.log(err)})
    console.log(users)
    res.json({userDetails:users})
})
sequelize.sync().then(()=>{
    console.log('Synced')
    app.listen(5000, ()=>{console.log('Server Running At Port 5000')})
}).catch(err=>{
    console.log(err)
})