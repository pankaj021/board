let { readJson, writeJson } = require('./helper');

function saveTimerDetails(boardId) {
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            boardData = boardData ? boardData : [];
            let startedAt = null;
            let isActive = false;
            for (let index = 0; index < boardData.length; index++) {
                const board = boardData[index];
                if(board._id === boardId) {
                    if(board.isActive) {   // finish the event for the day.
                        isActive = false;
                    } else if(shouldStartTheTimer(board.startedAt)){
                        startedAt = new Date();
                        board.startedAt = startedAt;
                        board.frequency += 1;
                        isActive = true;
                    }
                    board.isActive = isActive;
                    break;
                }
            }
            writeJson(filePath, boardData)
            .then(() => resolve(isActive))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function shouldStartTheTimer(lastStartedAt) {
    if(lastStartedAt){
        const currentTime = new Date().getTime();
        const lastTime = new Date(lastStartedAt).getTime();
        return (currentTime - lastTime > (60 * 1000));   //minimum 10hrs gap between two events.
    } else {
        return true;
    }
}

module.exports = {saveTimerDetails}