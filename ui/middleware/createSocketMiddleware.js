let socketIO = require('socket.io-client');
import * as events from '../actions/socketEvents';

const createMySocketMiddleware = (store) => {
    var io = socketIO('/');
    Object.keys(events).map(socketEvent => {
        io.on(socketEvent, (socketRes) => {
            console.log("socketRes: ", socketRes);
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
                io.emit(socketEvent, payload);
                return;
            } else {
                next(actions);
            }
        }
    }
}
export default createMySocketMiddleware;