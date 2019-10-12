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
            ...initialBoardData,
            cards: sortByAddAndExpiryDate(initialBoardData.columns, initialBoardData.cards)
        } 
    }
}

function sortByAddAndExpiryDate(columns, cards) {
    let filteredCards = [];
    if(columns){
        columns.forEach(column => {
            let columnCards = cards.filter(card => card.columnId === column._id);
            filteredCards = filteredCards.concat(columnCards.sort((a, b) => {
                if (!a.expiryDt) return 1;
                if(!b.expiryDt) return -1;
                // const toady = new Date();
                // const aExpiryDt = new Date(a.expiryDt);
                // const bExpiryDt = new Date(b.expiryDt);
                // if((aExpiryDt.setHours(0,0,0,0) - toady.setHours(0,0,0,0)) >= 7 * 86400000) return 1;
                return (new Date(a.expiryDt) - new Date(b.expiryDt));
            }))
        })
    }

    return filteredCards;
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

