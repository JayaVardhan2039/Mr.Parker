    const userModel=require('../models/user.model');

    module.exports.createUser=async({
        firstname,lastname,email,password,color,plate,capacity,vehicleType
    })=>{
        if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
            throw new Error('All fields are required')
        }
        const user=userModel.create({
            fullname:{
                firstname,
                lastname,
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType,
            }
        })

        return user;
    }