import * as actions from '../actions/actionTypes';
import * as socketEvents from '../actions/socketEvents';
import {getInitialBoardData, deleteAnItemFromList, editAnItemInList, updateItemInList, cancelEditFromList} from './helper';

const initState = getInitialBoardData();
if(initState.members) delete initState.members;

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
        case socketEvents.ADD_CARD_SUCCESS:
            return {
                ...state,
                cards: [
                    action.payload.card,
                    ...state.cards
                ]
            };
        case socketEvents.DELETE_CARD_SUCCESS:
            return {
                ...state,
                cards: deleteAnItemFromList(state.cards, action.payload.card)
            };
        case actions.EDIT_CARD:
            return {
                ...state,
                cards: editAnItemInList(state.cards, action.payload.card)
            };
        case actions.CANCEL_EDIT_CARD:
            return {
                ...state,
                cards: cancelEditFromList(state.cards, action.payload.card)
            };
        case socketEvents.UPDATE_CARD_SUCCESS:
            return {
                ...state,
                cards: updateItemInList(state.cards, action.payload.card)
            };
            case socketEvents.NOT_PRESENT_SUCCESS:
            return {
                ...state,
                facilitators: action.payload.facilitators
            };
        default:
            return state;
    }
};

export default boardReducer;