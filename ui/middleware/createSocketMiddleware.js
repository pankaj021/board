let socketIO = require('socket.io-client');
import * as events from '../actions/socketEvents';

const createMySocketMiddleware = (store) => {
    let {board} = store.getState();
    var io = socketIO('/');
    io.emit('JOIN_ROOM', board._id);
    Object.keys(events).map(socketEvent => {
        io.on(socketEvent, (socketRes) => {
            console.log("socketRes : ", socketRes);
            store.dispatch({
                type: socketEvent,
                payload: socketRes
            })
        })
    })

    return (next) => {
        return (actions) => {
            let {socketEvent, payload} = actions;
            if(socketEvent){
                io.emit(socketEvent, {
                    ...payload,
                    roomId: board._id
                });
                return;
            } else {
                next(actions);
            }
        }
    }
}
export default createMySocketMiddleware;