import axios from 'axios';
import * as actions from '../actionTypes';

export function addNewCard(userFields){
    return (dispatch) => {
        dispatch({
            type: actions.ADD_NEW_CARD_IN_COLUMN,
            card: userFields
        });
    }
}
export function deleteCard(columnId, cardId){
    return (dispatch) => {
        dispatch({
            type: actions.DELETE_CARD_FROM_COLUMN,
            data: {columnId, cardId}
        });
    }
}
