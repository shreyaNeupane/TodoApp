 const express = require('express')

 //rest object
 const app = express()

 //middlewares => allows your server to understand JSON data.  
 app.use(express.json())

 //routes
 app.get('/test',(req,res)=>{
    res.status(200).send('<h1>Welcome to Node server</h1>')
 })

 //port
 const PORT = 8080

 //listen
 app.listen(PORT , ()=>{
    console.log("Node server is running")
 })