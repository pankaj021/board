import React from 'react';
import {getDdOptions} from './helper';
import './DropDown.css';

const DropDown = (props) => {
    const {ddOptions, errorText, ddStyle, label} = props;
    const optionArray = getDdOptions(ddOptions);
    return (
        <div className='dropdown'>
            {label && <div className='h-font h-2 input-label'>{label + ' *'}</div>}
            <div className='dd-wrap'>
                <select style={ddStyle}>
                    {optionArray}
                </select>
                {errorText && <div>{errorText}</div>}
            </div>
        </div>
    )
}

export default DropDown;