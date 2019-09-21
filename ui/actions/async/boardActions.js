import * as actions from '../actionTypes';
import axios from 'axios';

export function createANewBoard(boardInfo) {
    return (dispatch) => {
        dispatch({type: actions.WAIT_FOR_RESULT, payload: "Creating a board for you !!!"});
        axios.post('/createBoard', boardInfo)
        .then( res => {
            if(res.data._id && (res.data.boardName === boardInfo.boardName))
                dispatch({type: actions.DISPLAY_BOARD_CONTENT, payload: res.data});
            else
                dispatch({type: actions.SHOW_ERROR_MESSAGE, payload: (res.data.message || "Error occurred while creating the board !!!")});
        })
        .catch( err => {
            dispatch({type: actions.SHOW_ERROR_MESSAGE, payload: "Error occurred while creating the board !!!"});
        })
    }
}

export function loadOldBoard(boardName) {
    return (dispatch) => {
        axios.get('/' + boardName)
        .then( res => {
            dispatch({type: actions.DISPLAY_BOARD_CONTENT, board: res.data.board})
        })
    }
}