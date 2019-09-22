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