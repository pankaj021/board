import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    board: boardReducer,
    error: errorReducer
});

export default rootReducer;
