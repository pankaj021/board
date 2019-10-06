import * as actions from '../actionTypes';
import axios from 'axios';

export function addANewMember(memberData) {
    return (dispatch) => {
        axios.post('/member', memberData)
        .then( res => {
            dispatch({type: actions.ADD_MEMBER, payload: res.data});
        })
        .catch( err => {
            dispatch({type: actions.SHOW_ERROR_MESSAGE, payload: err.message});
        })
    }
}

export function deleteAMember(memberData) {
    return (dispatch) => {
        axios.post('/member/delete', memberData)
        .then( res => {
            dispatch({type: actions.DELETE_MEMBER, payload: res.data});
        })
        .catch( err => {
            dispatch({type: actions.SHOW_ERROR_MESSAGE, payload: err.message});
        })
    }
}
