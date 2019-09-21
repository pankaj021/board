module.exports.isValidBoardName = (boardName) => {
    return boardName && boardName.indexOf(' ') === -1;
}