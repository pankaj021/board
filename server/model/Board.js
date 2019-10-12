const {randomIdGenerator} = require('./helper');

module.exports.Board = (reqBody) => {
    const {boardName, boardType, isBoardPublic} = reqBody;
    return {
        "_id": randomIdGenerator(),
        "boardName": boardName,
        "boardType": (boardType || "Standup"),
        "isPublic": (isBoardPublic || false),
        "facilitators": [],
        "columns": [],
        "avgTime": 0,
        "frequency": 0,
        "createTS": new Date()
    }
}