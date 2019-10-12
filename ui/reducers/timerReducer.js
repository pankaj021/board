import * as socketEvents from '../actions/socketEvents';
let initailValue = {hh: 0, mm: 0, ss: 30};
function getTimeSinceStandUpStarted(){
    if(initialBoardData.startedAt && initialBoardData.isActive){
        const hhOffSet = 60 * 60 * 1000;
        const mmOffSet = 60 * 1000;
        const ssOffSet = 1000;
        let targetTime = initailValue.hh * hhOffSet + initailValue.mm * mmOffSet + initailValue.ss * ssOffSet;
        let startedAt = new Date(initialBoardData.startedAt).getTime();
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - startedAt;
        let hh = Math.floor(timeDifference / hhOffSet);
        let hhInMS = hh * hhOffSet;
        let mm = Math.floor( (timeDifference - hhInMS) / mmOffSet);
        let mmInMS = hhInMS + (mm * mmOffSet);
        let ss = Math.floor( (timeDifference - mmInMS) / ssOffSet);
        let isDelayed = (targetTime - timeDifference < 0);
        console.log("isDelayed: ", isDelayed);
        
        return {
            hh: Math.abs(initailValue.hh - hh), 
            mm: Math.abs(initailValue.mm - mm), 
            ss: Math.abs(initailValue.ss - ss),
            isDelayed
        };
    }
    return initailValue;
}

const initialState = {
    initailValue,
    timerSarted: initialBoardData.isActive,
    timerStopped: !initialBoardData.isActive,
    timerBtnText: initialBoardData.isActive ? "Finish it on count of 3" : "Let's start",
    stopId: "",
    ...getTimeSinceStandUpStarted(),
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case socketEvents.TIMER_BTN_CLICKED:
            let timerSarted = !state.timerSarted;
            let timerBtnText = timerSarted ? "Finish it on count of 3" : "Let's start";
            return {...state, ...action.payload, timerSarted, timerBtnText, timerStopped: false};
        case socketEvents.TIMER_STOPPED:
            let timerStopped = !state.timerStopped;
            return {...state, timerStopped};
        default:
            return state;
    }
};

export default timerReducer;