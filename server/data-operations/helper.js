const shortid = require('shortid');
const fs = require('fs');

module.exports.getIndexOfBoard = (boardName, boardData) => {
    if(boardData instanceof Array){
        for (let index = 0; index < boardData.length; index++) {
            if(boardData[index].boardName === boardName){
                return index;
            }
        }
    }
    return -1;
}

module.exports.readJson = (filePath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) return reject(err);
            let parseData = null;
            try {
                parseData = data ? JSON.parse(data) : null;                
            } catch (error) {
                return reject(error);
            }
            resolve(parseData);
        })
    })
}

module.exports.getNewBoardInfo = (reqBody) => {
    const {boardName, boardType, isBoardPublic} = reqBody;
    return {
        "_id": shortid.generate(),
        "boardName": boardName,
        "boardType": boardType,
        "isPublic": isBoardPublic,
        "facilitators": [],
        "avgTime": 0,
        "frequency": 0,
        "ceateTS": new Date()
    }
}
