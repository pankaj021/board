import React, {Component} from 'react';
import {getDdOptions} from './helper';
import './DropDown.css';

class DropDown extends Component {
    constructor(){
        super();
    }
    render(){
        const {ddOptions, errorText, ddStyle, label, id, isRequired, onChangeHandler, ddRef} = this.props;
        const optionArray = getDdOptions(ddOptions);
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
                    {errorText && <div>{errorText}</div>}
                </div>
            </div>
        )
    }
}

export default DropDown;