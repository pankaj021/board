let { readJson, writeJson } = require('./helper');
let {getNextFacilitatorList} = require('./facilitatorOperations');
let {autoCleanData} = require('../data-operations/cardOperations');
const {INACTIVE_TIME} = require('../../constants');

function saveTimerDetails(boardId) {
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(async (boardData) => {
            boardData = boardData ? boardData : [];
            let startedAt = null;
            let isActive = false;
            let currentBoard = null;
            let newFacilitators = null;
            let triggerClap = false;
            for (let index = 0; index < boardData.length; index++) {
                const board = boardData[index];
                currentBoard = board;
                newFacilitators = currentBoard.facilitators;
                if(board._id === boardId) {
                    if(board.isActive) {   // finish the event for the day.
                        isActive = false;
                        triggerClap = true;
                        newFacilitators = await getNextFacilitatorList(currentBoard);
                    } else if(shouldStartTheTimer(board.startedAt)){
                        await autoCleanData({boardName: board.boardName});
                        startedAt = new Date();
                        board.startedAt = startedAt;
                        board.frequency += 1;
                        isActive = true;
                        // triggerClap = true;
                    } else {
                        // triggerClap = false;
                    }
                    board.isActive = isActive;
                    board.facilitators = newFacilitators;
                    break;
                }
            }

            writeJson(filePath, boardData)
            .then(() => resolve({
                isActive,
                triggerClap,
                newFacilitators
            }))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function shouldStartTheTimer(lastStartedAt) {
    if(lastStartedAt){
        const currentTime = new Date().getTime();
        const lastTime = new Date(lastStartedAt).getTime();
        return (currentTime - lastTime > (INACTIVE_TIME || 12 * 60 * 60 * 1000));   //minimum 10hrs gap between two events.
    } else {
        return true;
    }
}

module.exports = {saveTimerDetails}