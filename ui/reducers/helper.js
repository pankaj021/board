module.exports.getInitialPublicBoardData = () => {
    if(initialBoardData.homeRoute) {
        return {
            publicBoards: initialBoardData.publicBoards,
            showHeaderItems: false
        }
    }
    return {
        publicBoards: [],
        showHeaderItems: !!initialBoardData._id
    };
}


module.exports.getInitialMemberData = () => {
    if(initialBoardData.members) {
        return initialBoardData.members;
    }
    return [];
}

module.exports.getInitialBoardData = () => {
    if(initialBoardData.homeRoute) {
        return {
            isLoading: false,
            loadMsg: "",
            isError: false,
            errorMsg: ""
        }
    } else if(!initialBoardData._id){
        return {
            isLoading: false,
            loadMsg: "",
            isError: true,
            errorMsg: initialBoardData.message
        }
    } else {
        return {
            isLoading: false,
            loadMsg: "",
            isError: false,
            errorMsg: "",
            ...initialBoardData
        } 
    }
}

module.exports.deleteAnItemFromList = (list, item) => {
    return list.filter( listItem => listItem._id !== item._id)
}

module.exports.updateItemInList = (list, item) => {
    return list.map( listItem => {
        if(listItem._id === item._id) return {...item, isEdited: false};
        return listItem;
    })
}

module.exports.editAnItemInList = (list, item) => {
    return list.map( listItem => {
        if(listItem._id === item._id) return {...item, isEdited: true};
        return listItem;
    })
}

module.exports.cancelEditFromList = (list, item) => {
    return list.map( listItem => {
        if(listItem._id === item._id) return {...listItem, isEdited: false};
        return listItem;
    })
}

