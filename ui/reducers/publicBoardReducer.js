import * as actionTypes from '../actions/actionTypes';
import {getInitialPublicBoardData} from './helper';

const initialState = getInitialPublicBoardData();

const publicBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default publicBoardReducer;