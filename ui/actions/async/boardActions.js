import * as actions from '../actionTypes';
import axios from 'axios';

export function createNewBoard({boardName, boardType}) {
    return (dispatch) => {
        dispatch({type: actions.WAIT_FOR_RESULT});
        axios.post('/createBoard', { boardName, boardType})
        .then( res => {
            dispatch({type: actions.DISPLAY_BOARD_CONTENT, board: res.data.board})
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