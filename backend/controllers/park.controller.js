const parkService = require('../services/park.service');
const { validationResult } = require('express-validator');

module.exports.createPark = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }
        const park = await parkService.createPark({ user: req.user._id, pickup, destination ,vehicleType });
        res.status(201).json(park);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup,destination } = req.query;

    try {
        const fare = await parkService.getFare(pickup,destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

{/*module.exports.confirmPark = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { parkId } = req.body;

    try {
        const park = await parkService.confirmPark(parkId);
        res.status(200).json(park);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};*/}