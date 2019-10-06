module.exports.getInitialMemberData = () => {
    if(initailBoardData.members) {
        return initailBoardData.members;
    }
    return [];
}

module.exports.getInitialBoardData = () => {
    if(initailBoardData.homeRoute) {
        return {
            isLoading: false,
            loadMsg: "",
            isError: false,
            errorMsg: ""
        }
    } else if(!initailBoardData._id){
        return {
            isLoading: false,
            loadMsg: "",
            isError: true,
            errorMsg: initailBoardData.message
        }
    } else {
        return {
            isLoading: false,
            loadMsg: "",
            isError: false,
            errorMsg: "",
            ...initailBoardData
        } 
    }
}
module.exports.deleteAnItemFromList = (list, item) => {
    return list.filter( listItem => listItem._id !== item._id)
}