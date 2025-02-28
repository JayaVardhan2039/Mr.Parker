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
    body('time').optional({ checkFalsy: true }).isISO8601().withMessage('Invalid Time Format'),
    parkController.createPark
);
 
router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    parkController.getFare
);

router.post('/confirm',
    authMiddleware.authMrParker,
    body('parkId').isMongoId().withMessage('Invalid Park Id'),
    parkController.confirmPark
);

router.get('/start-park',
    authMiddleware.authMrParker,
    query('parkId').isMongoId().withMessage('Invalid Park Id'),
    query('otp').isNumeric().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    parkController.startPark
);

router.get('/request-otp',
    authMiddleware.authUser,
    query('parkId').isMongoId().withMessage('Invalid Park Id'),
    parkController.requestOtp
);

router.get('/request-otp', authMiddleware.authMrParker, parkController.requestOtp);

router.post('/complete-handover',
    authMiddleware.authUser,
    parkController.completeHandover
);

router.post('/end-park',
    authMiddleware.authMrParker,
    body('parkId').isMongoId().withMessage('Invalid Park Id'),
    parkController.endPark
);

module.exports = router;