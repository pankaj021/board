const {randomIdGenerator} = require('./helper');

module.exports.Card = ({columnId, content, addedBy, expiryDt}) => {
    return {
        "_id": randomIdGenerator(),
        "columnId": columnId,
        "content": content,
        "addedBy": (addedBy || "All"),
        "expiryDt": (expiryDt || ""),
        "addedDt": new Date(),
        "updatedDt": null
    }
}