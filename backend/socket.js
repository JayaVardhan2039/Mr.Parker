const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const mrParkerModel = require('./models/mrparker.model');
const ParkModel = require('./models/park.model');

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('Client connected with id:', socket.id);


        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User ${userId} joined as ${userType}`);
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId,{socketId: socket.id});
            }
            else if (userType === 'mrparker') {
                await mrParkerModel.findByIdAndUpdate(userId,{socketId: socket.id});
            }
        });

        socket.on('update-location-mrparker', async (data) => {
            const { userId, location } = data;
            if(!location.ltd || !location.lng || !location){
                socket.emit('error', 'Invalid location data');
            }
            await mrParkerModel.findByIdAndUpdate(userId,{location:{
                ltd: location.ltd,
                lng: location.lng
            }});
        }
        );

        socket.on('sp-clicked', (data) => {
            const { message } = data;
            io.emit('sp-clicked', { message });
        });

        socket.on('request-handover', async (data) => {
            const { parkId } = data;
            const park = await ParkModel.findById(parkId).populate('mrparker');
            if (park && park.mrparker && park.mrparker.socketId) {
                io.to(park.mrparker.socketId).emit('request-handover', { parkId });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else {
        console.log('Socket not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
