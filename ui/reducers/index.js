import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userTypingReducer from './userTypingReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
    board: boardReducer,
    userTyping: userTypingReducer,
    timer: timerReducer
});

export default rootReducer;
