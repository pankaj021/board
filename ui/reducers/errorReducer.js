import * as actionTypes from '../actions/action-type';

function errorMessage(state = null, action) {
    const { type, error } = action;
    if (type === actionTypes.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return error;
    }
    return state;
}

export default errorMessage;
