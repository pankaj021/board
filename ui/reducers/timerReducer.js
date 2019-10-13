import * as socketEvents from '../actions/socketEvents';
import {getTimeSinceStandUpStarted} from '../helper/getTimeSinceStandUpStarted';

let initailValue = {hh: 0, mm: 0, ss: 30};

const initialState = {
    initailValue,
    timerSarted: initialBoardData.isActive,
    timerStopped: !initialBoardData.isActive,
    timerBtnText: initialBoardData.isActive ? "Finish it on count of 3" : "Let's start",
    stopId: "",
    ...getTimeSinceStandUpStarted(initailValue, initialBoardData.isActive),
    isDisabled: false,
    triggerClap: false
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case socketEvents.TIMER_BTN_CLICKED:
            let timerSarted = action.payload.isActive;
            let triggerClap = action.payload.triggerClap;
            console.log("timerSarted : ", timerSarted);
            let timerBtnText = timerSarted ? "Finish it on count of 3" : "It's done for the day.";
            let isDisabled = !timerSarted;
            return {...state, timerSarted, timerBtnText, timerStopped: false, isDisabled, triggerClap};
        case socketEvents.TIMER_STOPPED:
            let timerStopped = !state.timerStopped;
            return {...state, timerStopped};
        default:
            return state;
    }
};

export default timerReducer;