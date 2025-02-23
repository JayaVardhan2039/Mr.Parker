const parkModel = require('../models/park.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    console.log('distanceTime', distanceTime);
    const rates = {
        car: { base: 50, perKm: 15, perMinute: 2 },
        motorcycle: { base: 30, perKm: 10, perMinute: 1.5 },
        bicycle: { base: 20, perKm: 5, perMinute: 0.5 },
        bike: { base: 20, perKm: 5, perMinute: 0.5 }
    };

    const fares = {};
    for (const vehicle in rates) {
        const { base, perKm, perMinute } = rates[vehicle];
        fares[vehicle] = Math.round(base +
            ((distanceTime.distance.value / 1000) * perKm) +
            ((distanceTime.duration.value / 60) * perMinute));
    }

    return fares;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const randomBytes = crypto.randomBytes(4).readUInt32BE(0).toString();
        const numStr = randomBytes.substring(0, num);
        return parseInt(numStr) || Math.floor(Math.pow(10, num - 1) + Math.random() * Math.pow(10, num - 1));
    }
    return generateOtp(num);
}

module.exports.createPark = async ({ user, pickup,destination,vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, Pickup, Destination and Vehicle Type are required');
    }
    const fare = await getFare(pickup, destination);

    const park = parkModel.create({ user, pickup, destination, otp:getOtp(6), fare: fare[vehicleType], vehicleType });

    return park;
};  