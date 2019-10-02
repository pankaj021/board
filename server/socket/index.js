var socketIO = require('socket.io');
const {addANewCard, deleteACard} = require('../data-operations/cardOperations');
const socketEvents = require('../../ui/actions/socketEvents');

function getSocketConnection(server) {
    var io = socketIO(server, {
        serveClient: true,
        pingInterval: 10000,
        pingTimeout: 30000,
        upgradeTimeout: 21000, // default value is 10000ms, try changing it to 20k or more
    });
    let defaultError = {status: 500, message: "Internal server error"};
    io.on('connection', (client) => {
        console.log("Connected to socket!! " + client.id)	
        client.on('disconnect', () => {
            console.log('Disconnected - ' + client.id);
        });
        client.on('JOIN_ROOM', (roomId) => {
            console.log("room id: ", roomId);
            if(roomId) client.join(roomId);
        })
        client.on(socketEvents.USER_TYPING, (reqBody) => {
            console.log('typingStarted event...', reqBody.roomId);
            io.to(reqBody.roomId).emit(socketEvents.USER_TYPING, reqBody.typingMsg);
        });
        client.on(socketEvents.ADD_CARD, (reqBody) => {
            console.log("ADD_CARD reqBody: ", reqBody);
            addANewCard(reqBody.card)
            .then(card => io.to(reqBody.roomId).emit(socketEvents.ADD_CARD_SUCCESS, {status: 200, card}))
            .catch(err => {
                console.error("ADD_CARD Error: ", err);
                io.to(reqBody.roomId).emit(socketEvents.ADD_CARD_ERROR, defaultError);
            });
        });
        client.on(socketEvents.DELETE_CARD, (reqBody) => {
            console.log("DELETE_CARD reqBody: ", reqBody);
            deleteACard(reqBody.card)
            .then(card => io.to(reqBody.roomId).emit(socketEvents.DELETE_CARD_SUCCESS, {status: 200, card}))
            .catch(err => {
                console.error("DELETE_CARD Error: ", err);
                io.to(reqBody.roomId).emit(socketEvents.DELETE_CARD_ERROR, defaultError);
            });
        });
    })
}

module.exports = getSocketConnection;