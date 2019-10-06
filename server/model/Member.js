const {randomIdGenerator} = require('./helper');

module.exports.Member = ({boardId, fullName, nickName}) => {
    return {
        "_id": randomIdGenerator(),
        "boardId": boardId,
        "fullName": fullName || "All",
        "nickName": nickName || "All",
        "isPresent": true,
        "frequency": 0,
        "createTS": new Date()
    }
}