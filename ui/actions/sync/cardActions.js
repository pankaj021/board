import * as actions from '../actionTypes';

export function editCard(cardReq){
    return ({
        type: actions.EDIT_CARD,
        payload: {card: cardReq}
    })
}

export function cancelEdit(cardReq){
    return ({
        type: actions.CANCEL_EDIT_CARD,
        payload: {card: cardReq}
    })
}

