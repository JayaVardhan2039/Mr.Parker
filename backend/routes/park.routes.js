const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const parkController = require('../controllers/park.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    body('vehicleType').isIn(['car', 'motorcycle', 'bicycle', 'bike']).withMessage('Invalid Vehicle Type'),
    parkController.createPark
);

{/*router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    parkController.getFare
);

router.post('/confirm',
    authMiddleware.authMrParker,
    body('parkId').isMongoId().withMessage('Invalid Park Id'),
    parkController.confirmPark
);*/}

module.exports = router;