import * as events from '../socketEvents';

export const userTyping = (typingMsg) => ({
    socketEvent: events.USER_TYPING,
    payload: typingMsg
})