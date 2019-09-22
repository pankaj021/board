import * as actions from '../actions/actionTypes';
import {getInitialBoardData} from './helper';

const initState = getInitialBoardData();

const boardReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.WAIT_FOR_RESULT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                loadMsg: action.payload,
                errorMsg: ""
            };
        case actions.SHOW_ERROR_MESSAGE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                loadMsg: "",
                errorMsg: action.payload
            };
        case actions.DISPLAY_BOARD_CONTENT:
            return {
                ...state,
                isLoading: false,
                isError: false,
                loadMsg: "",
                errorMsg: false,
                ...action.payload
            };
        default:
            return state;
    }
};

export default boardReducer;