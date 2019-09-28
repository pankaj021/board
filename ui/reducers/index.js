import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import columnReducer from './columnReducers';

const rootReducer = combineReducers({
    board: boardReducer,
    column: columnReducer
});

export default rootReducer;
