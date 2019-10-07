import * as socketEvents from '../actions/socketEvents';

const initialState = {
    timerSarted: false,
    timerStopped: true,
    timerBtnText: "Let's start",
    stopId: "",
    hh: 0,
    mm: 0, 
    ss: 30
}
const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case socketEvents.TIMER_BTN_CLICKED:
            let timerSarted = !state.timerSarted;
            let timerBtnText = timerSarted ? "Finish it on count of 3" : initialState.timerBtnText;
            return {...state, ...action.payload, timerSarted, timerBtnText, timerStopped: false};
        case socketEvents.TIMER_STOPPED:
            let timerStopped = !state.timerStopped;
            return {...state, timerStopped};
        default:
            return state;
    }
};

export default timerReducer;