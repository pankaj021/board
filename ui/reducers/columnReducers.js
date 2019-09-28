import * as socketEvents from '../actions/socketEvents';

const columnReducer = (state = {}, action) => {
    switch (action.type) {
        case socketEvents.USER_TYPING:
            return {...state, typingMsg: action.payload};
        default:
            return state;
    }
};

export default columnReducer;