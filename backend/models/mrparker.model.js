const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MrParkerschema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleast 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be atleast 3 characters long'],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'Invalid Email'],
    },
    password:{
        type:String,
        required:true,
        minlength:[5,'Password must be atleast 5 characters long'],
        select:false,
    },  
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum: ['active','inactive'],
        default:'inactive',
    },
    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    },
    Earning:{
        type:Number,
        default:0,
    },
    parks:{
        type:Number,
        default:0,
    }
    })

MrParkerschema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

MrParkerschema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

MrParkerschema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const MrParkerModel=mongoose.model('MrParker',MrParkerschema);

module.exports=MrParkerModel;