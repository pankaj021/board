import * as actionTypes from '../actions/actionTypes';
import {getInitialMemberData} from './helper';

const initialState = getInitialMemberData();

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MEMBER:
            return [action.payload, ...state];
        case actionTypes.DELETE_MEMBER:
            return state.filter(member => member._id !== action.payload._id);
        default:
            return state;
    }
};

export default memberReducer;