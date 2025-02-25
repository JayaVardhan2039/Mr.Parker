const parkService = require('../services/park.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const parkModel = require('../models/park.model');
const { request } = require('express');

module.exports.createPark = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const park = await parkService.createPark({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(park);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const mrParkersInRadius = await mapService.getMrParkersInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2000);
        park.otp = ''

        const parkWithUser= await parkModel.findOne({_id: park._id}).populate('user');

        mrParkersInRadius.map(mrparker => {
            sendMessageToSocketId(mrparker.socketId,
                {
                    event: 'new-park',
                    data: parkWithUser
                });
        });




    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;

    try {
        const fare = await parkService.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.confirmPark = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { parkId } = req.body;

    try {
        const park = await parkService.confirmPark({parkId, mrparker: req.MrParker});

        sendMessageToSocketId(park.user.socketId,   {
            event: 'park-confirmed',
            data: park
        })

        res.status(200).json(park);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};