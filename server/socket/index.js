var socketIO = require('socket.io');

function getSocketConnection(server) {
    var io = socketIO(server);
    io.on('connection', (client) => {
        console.log("Connected to socket!! " + client.id)	
        client.on('disconnect', () => {
            console.log('Disconnected - ' + client.id);
        });
        client.on('USER_TYPING', (reqBody) => {
            console.log('typingStarted event...', reqBody);
            io.emit('USER_TYPING', reqBody);
        });
    })
}

module.exports = getSocketConnection;