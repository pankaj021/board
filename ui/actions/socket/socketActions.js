import * as events from '../socketEvents';

export const userTyping = (typingMsg) => ({
    socketEvent: events.USER_TYPING,
    payload: {typingMsg}
});

export const addCard = (cardReq) => ({
    socketEvent: events.ADD_CARD,
    payload: {card: cardReq}
});

export const deleteCard = (cardReq) => ({
    socketEvent: events.DELETE_CARD,
    payload: {card: cardReq}
})