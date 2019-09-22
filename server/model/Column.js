const {randomIdGenerator} = require('./helper');

module.exports.Column = ({columnName, boardId}) => {
    return {
        "_id": randomIdGenerator(),
        "boardId": boardId,
        "columnName": columnName,
        "cards": [],
    }
}