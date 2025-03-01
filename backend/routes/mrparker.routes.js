const express = require('express');
const MrParkerController = require('../controllers/mrparker.controller');   
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
    body('phonenumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
],
    MrParkerController.createMrParker);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
],
    MrParkerController.loginMrParker
);

router.get('/profile',authMiddleware.authMrParker,MrParkerController.getMrParkerProfile);

router.get('/logout', authMiddleware.authMrParker, MrParkerController.logoutMrParker);

module.exports=router;