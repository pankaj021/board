import * as socketEvents from '../actions/socketEvents';

const userTypingReducer = (state = {}, action) => {
    switch (action.type) {
        case socketEvents.USER_TYPING:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default userTypingReducer;