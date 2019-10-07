import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userTypingReducer from './userTypingReducer';
import timerReducer from './timerReducer';
import memberReducer from './memberReducer';
import publicBoardReducer from './publicBoardReducer';

const rootReducer = combineReducers({
    board: boardReducer,
    userTyping: userTypingReducer,
    timer: timerReducer,
    members: memberReducer,
    home: publicBoardReducer
});

export default rootReducer;
