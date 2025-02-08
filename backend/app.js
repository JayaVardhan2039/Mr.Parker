const dotenv=require('dotenv');
dotenv.config();
const connectToDb=require('./db/db');
connectToDb();
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const mrparkerRoutes=require('./routes/mrparker.routes');
const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users',userRoutes);
app.use('/mrparkers',mrparkerRoutes);    

module.exports=app;