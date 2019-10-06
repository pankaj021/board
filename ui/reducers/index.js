import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userTypingReducer from './userTypingReducer';
import timerReducer from './timerReducer';
import memberReducer from './memberReducer';

const rootReducer = combineReducers({
    board: boardReducer,
    userTyping: userTypingReducer,
    timer: timerReducer,
    members: memberReducer
});

export default rootReducer;
