export const getTimeSinceStandUpStarted = (initailValue, isActive) => {
    console.log("statrted at: ", new Date(initialBoardData.startedAt));
    console.log("current : ", new Date());
    
    if(initialBoardData.startedAt && isActive){
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
        return {
            hh: Math.abs(initailValue.hh - hh), 
            mm: Math.abs(initailValue.mm - mm), 
            ss: Math.abs(initailValue.ss - ss),
            isDelayed
        };
    }
    return initailValue;
}