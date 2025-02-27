const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    mrparker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MrParker', 
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp:{
        type: Number,
        select: false,
        required: true,
    },
    time: {
        type: Date,
        required: false,
    }

})


module.exports = mongoose.model('park', parkSchema);