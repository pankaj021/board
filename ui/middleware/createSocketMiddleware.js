let socketIO = require('socket.io-client');
import * as events from '../actions/socketEvents';
import * as actionTypes from '../actions/actionTypes';

const createMySocketMiddleware = (store) => {
    var io = socketIO('/');
    io.emit('JOIN_ROOM', store.getState().board._id);
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
                    roomId: store.getState().board._id
                });
                return;
            } else {
                if(actions.type === actionTypes.DISPLAY_BOARD_CONTENT) io.emit('JOIN_ROOM', actions.payload._id);
                next(actions);
            }
        }
    }
}
export default createMySocketMiddleware;