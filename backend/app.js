const dotenv=require('dotenv');
dotenv.config();
const connectToDb=require('./db/db');
connectToDb();
const express=require('express');
const app=express();

const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const userRoutes=require('./routes/user.routes');
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users',userRoutes);

module.exports=app;