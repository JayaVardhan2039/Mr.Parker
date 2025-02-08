const MrParkerModel = require('../models/mrparker.model');

module.exports.createMrParker = async ({
    firstname, lastname, email, password
})=>{
    if(!firstname || !email || !password ){
        throw new Error('All fields are required');
    }
    const MrParker = MrParkerModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        
    });
    return MrParker;
}