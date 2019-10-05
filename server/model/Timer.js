const {randomIdGenerator} = require('./helper');

module.exports.Timer = ({boardId}) => {
    return {
        "_id": randomIdGenerator(),
        "boardId": boardId,
        "timerSarted": false,
        "timerStopped": true,
        "timerBtnText": "Let's start",
        "hh": 0,
        "mm": 0, 
        "ss": 30
    }
}