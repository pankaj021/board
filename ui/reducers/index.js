import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userTypingReducer from './userTypingReducer';

const rootReducer = combineReducers({
    board: boardReducer,
    userTyping: userTypingReducer
});

export default rootReducer;
