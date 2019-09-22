const fs = require('fs');

function getIndexOfBoard(boardName, boardData) {
    if(boardData instanceof Array){
        for (let index = 0; index < boardData.length; index++) {
            if(boardData[index].boardName === boardName){
                return index;
            }
        }
    }
    return -1;
}

function readJson(filePath){
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

function writeJson(filePath, data){
    return new Promise ((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 3), 'utf8', (err) => {
            if (err) return reject(err);
            return resolve(data);
        });
    })
}

module.exports = { getIndexOfBoard, readJson, writeJson };