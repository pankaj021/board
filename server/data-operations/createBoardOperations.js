let fs = require('fs');
let { getIndexOfBoard, readJson, getNewBoardInfo } = require('./helper');

module.exports.safelyCreateANewBoard = (reqBody) => {
    const { boardName } = reqBody;
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            if (boardData && getIndexOfBoard(boardName, boardData) > -1) return resolve({ message: `${boardName} : Board is already taken !!!` });
            getNewBoardInfo(reqBody, boardData)
            .then(newBoardinfo => resolve(newBoardinfo))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}