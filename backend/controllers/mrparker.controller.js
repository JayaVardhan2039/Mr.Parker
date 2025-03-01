const MrParkerModel = require('../models/mrparker.model');
const MrParkerService = require('../services/mrparker.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel=require('../models/blacklistToken.model')

module.exports.createMrParker = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, phonenumber } = req.body;

    const isMrParkerAlreadyRegistered = await MrParkerModel.findOne({ email });
    if (isMrParkerAlreadyRegistered) {
        return res.status(400).json({ message: 'MrParker already registered' });
    }
    const hashedPassword = await MrParkerModel.hashPassword(password);

    const MrParker = await MrParkerService.createMrParker({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        phonenumber
    });


    const token = MrParker.generateAuthToken();
    res.status(201).json({ token, MrParker });  
}
module.exports.loginMrParker = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;

    const MrParker=await MrParkerModel.findOne({email}).select('+password');

    if(!MrParker){
        return res.status(401).json({message:'Invalid Email or Password'});
    }

    const isMatch=await MrParker.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid Email or Password'});
    }
    const token=MrParker.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,MrParker});
}

module.exports.getMrParkerProfile = async (req, res, next) => {
    res.status(200).json(req.MrParker);
}

module.exports.logoutMrParker = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}