import React, {Component} from 'react';
import {getDdOptions} from './helper';
import './DropDown.css';

class DropDown extends Component {
    constructor(){
        super();
    }
    render(){
        const {ddOptions, errorMsg, ddStyle, label, id, isRequired, onChangeHandler, ddRef, hasError} = this.props;
        const optionArray = getDdOptions(ddOptions);
        const errorClass = hasError && errorMsg ? ' visible' : ' hidden';
        return (
            <div id={id} className='dropdown'>
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : '')}</div>}
                <div className='dd-wrap'>
                    <select style={ddStyle} ref={'ddSelect'} 
                        onChange={onChangeHandler}
                        ref={ddRef}
                    >
                        {optionArray}
                    </select>
                </div>
                {<div className={'error-label' + errorClass}>{errorMsg || 'Some Error.'}</div>}
            </div>
        )
    }
}

export default DropDown;