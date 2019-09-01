import React, {Component} from 'react';
import {getDdOptions} from './helper';
import './DropDown.css';

class DropDown extends Component {
    constructor(){
        super();
        this.ddClick = this.ddClick.bind(this);
    }
    ddClick(){
         this.refs.ddSelect.click()
    }
    render(){
        const {ddOptions, errorText, ddStyle, label, id, isRequired} = this.props;
        const optionArray = getDdOptions(ddOptions);
        return (
            <div id={id} className='dropdown' onClick={this.ddClick}>
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : '')}</div>}
                <div className='dd-wrap'>
                    <select style={ddStyle} ref={'ddSelect'}>
                        {optionArray}
                    </select>
                    {errorText && <div>{errorText}</div>}
                </div>
            </div>
        )
    }
}

export default DropDown;