const {randomIdGenerator} = require('./helper');

module.exports.Card = ({columnId, content, addedby, expiryDt}) => {
    return {
        "_id": randomIdGenerator(),
        "columnId": columnId,
        "content": content,
        "addedby": (addedby || ""),
        "expiryDt": (expiryDt || ""),
        "addedDt": new Date(),
        "updatedDt": null
    }
}