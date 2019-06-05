import React from 'react';
import {getDdOptions} from './helper';
import './DropDown.css';

const DropDown = (props) => {
    const {ddOptions, errorText, ddStyle} = props;
    const optionArray = getDdOptions(ddOptions);
    return (
        <div className='dd-wrap'>
            <select style={ddStyle}>
                {optionArray}
            </select>
            {errorText && <div>{errorText}</div>}
        </div>
    )
}

export default DropDown;