import * as events from '../socketEvents';

export const userTyping = ({columnId, typingMsg}) => ({
    socketEvent: events.USER_TYPING,
    payload: {columnId, typingMsg}
});

export const addCard = (cardReq) => ({
    socketEvent: events.ADD_CARD,
    payload: {card: cardReq}
});

export const deleteCard = (cardReq) => ({
    socketEvent: events.DELETE_CARD,
    payload: {card: cardReq}
})