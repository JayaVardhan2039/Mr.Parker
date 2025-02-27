const parkModel = require('../models/park.model');
const { sendMessageToSocketId } = require('../socket');
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

module.exports.createPark = async ({ user, pickup, destination, vehicleType, time }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, Pickup, Destination and Vehicle Type are required');
    }
    const fare = await getFare(pickup, destination);

    const park = parkModel.create({ user, pickup, destination, otp: getOtp(6), fare: fare[vehicleType], vehicleType, time });

    return park;
};  

module.exports.confirmPark = async ({parkId,mrparker}) => {
    if (!parkId) {
        throw new Error('Park Id is required');
    }

    console.log('parkId', parkId);
    console.log('mrparker', mrparker);

    await parkModel.findOneAndUpdate({ _id
        : parkId }, { status: 'accepted',
            mrparker:mrparker._id 
         });

    const park = await parkModel.findOne
    ({ _id: parkId }).populate('user').populate('mrparker').select('+otp');

    if (!park) {
        throw new Error('Park not found');
    }
    
    return park;
}

module.exports.startPark = async ({ parkId, otp, mrparker }) => {
    if (!parkId || !otp) {
        throw new Error('Park Id and OTP are required');
    }

    const park = await parkModel.findOne({ _id: parkId }).populate('user').populate('mrparker').select('+otp');
    
    if(!park){
        throw new Error('Park not found');
    }
    if(park.status!=='accepted'){
        throw new Error('Park is not accepted');
    }
    if(park.otp!==otp){
        throw new Error('Invalid OTP');
    }

    await parkModel.findOneAndUpdate({ _id:parkId }, { status: 'ongoing' });

    sendMessageToSocketId(park.user.socketId, {
        event: 'park-started',
        data: park
    });

    return park;
}

module.exports.generateOtp = async (parkId) => {
    const park = await parkModel.findById(parkId);
    if (!park) {
        throw new Error('Park not found');
    }
    const otp = getOtp(6);
    park.otp = otp;
    await park.save();
    return otp;
}

module.exports.completeHandover = async (parkId, otp) => {
    const park = await parkModel.findOne({ _id: parkId, otp });
    if (!park) {
        throw new Error('Invalid OTP or Park not found');
    }
    park.status = 'ongoing';
    await park.save();
}

module.exports.endPark = async ({ parkId,mrparker }) => {
    if (!parkId) {
        throw new Error('Park Id is required');
    }

    const park=await parkModel.findOne({_id:parkId,mrparker:mrparker._id}).populate('user').populate('mrparker');
    if(!park){
        throw new Error('Park not found');
    }
    if(park.status!=='ongoing'){
        throw new Error('Park is not ongoing');
    }
    await parkModel.findOneAndUpdate
    ({ _id: parkId }, { status: 'completed' });
    return park;
}