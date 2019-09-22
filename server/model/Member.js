const {randomIdGenerator} = require('./helper');

module.exports.Column = ({boardId, name}) => {
    return {
        "_id": randomIdGenerator(),
        "boardId": boardId,
        "name": name,
        "frequency": 0,
        "isPresent": true
    }
}