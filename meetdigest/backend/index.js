// const express=require('express')
// const app = express()
// var cors=require('cors');

// const port =5000
// const mongoDB=require('./db')
// mongoDB();
// app.use((req,res,next)=>{
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Methods', 'POST');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');    
// next();
// })
// app.get('/',(req,res)=>
// {
//     res.send("Hello")
// })
// app.use(cors());
// app.use(express.json())
// app.use('/api', require('./Routes/MeetInfo'));
// app.listen(port,()=>
// {
//     console.log(`Example listening on ${port}`)
// })

// const express = require('express');
// const cors = require('cors');
// const mongoose=require('mongoose')
// const connectDB = require('./db');
// const meetInfoRoutes = require('./Routes/MeetData');

// const app = express();
// const port = 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', meetInfoRoutes);

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// // });

// const express=require('express')
// const mongoose=require('mongoose')
// const cors=require('cors')
// const MeetModel =require('./models/Meet')
// const app=express()
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb+srv://kaloa2025:aalok21004@cluster0.xgpa9vt.mongodb.net/hackhive?retryWrites=true&w=majority&appName=Cluster0")

// app.get('/getMeet',(req,res)=>{
//     MeetModel.find().then(meetData=>res.json(meetData)).catch(err=>res.json(err))
// })

// app.listen(3000,()=>{
//     console.log("Sever listening");
// })




const express=require('express')
const app = express()
var cors=require('cors');

const port =5000
const mongoDB=require('./dbmeet')
mongoDB();
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Methods', 'GET');
res.setHeader('Access-Control-Allow-Methods', 'POST');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');    
next();
})
app.get('/',(req,res)=>
{
    res.send("Hello")
})
app.use(cors());
app.use(express.json())
app.use('/api',require('./Routes/MeetData'));
app.listen(port,()=>
{
    console.log(`Example listening on ${port}`)
})