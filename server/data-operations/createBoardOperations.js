let fs = require('fs');
let {getIndexOfBoard, getNewBoardInfo, readJson} = require('./helper');

module.exports.safelyCreateANewBoard = (reqBody) => {
    const {boardName} = reqBody;
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            if(boardData && getIndexOfBoard(boardName, boardData) > -1) return resolve({message: "Board is already taken !!!"});
            const newBoardinfo = getNewBoardInfo(reqBody);
            boardData.push(newBoardinfo);
            fs.writeFile(filePath, JSON.stringify(boardData, null, 3), 'utf8', (err) => {
                if (err) return reject(err);
                return resolve(newBoardinfo);
            });
        })
        .catch(err => reject(err));
    })
}