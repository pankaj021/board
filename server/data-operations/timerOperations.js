let { readJson, writeJson } = require('./helper');

function saveTimerDetails(boardId) {
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            boardData = boardData ? boardData : [];
            let startedAt = null;
            for (let index = 0; index < boardData.length; index++) {
                const board = boardData[index];
                if(board._id === boardId) {
                    startedAt = new Date();
                    board.startedAt = startedAt;
                    board.frequency += 1;
                    board.isActive = true;
                    break;
                }
            }
            writeJson(filePath, boardData)
            .then(() => resolve(startedAt))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

module.exports = {saveTimerDetails}