require('dotenv').config()

const mongoose=require('mongoose')
const express=require('express')
const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{
  console.log(`connected to MongoDB ${mongoose.connection.name}.`)
})












app.listen(process.env.PORT,()=>{
  console.log(`the express app is ready on port ${process.env.PORT} YAY!`)
})