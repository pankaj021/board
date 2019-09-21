import React from 'react';
import './DatePicker.css';

const DatePicker = (props) => {
    const {label, className, placeholder, id, isRequired} = props;
    const datePlaceHolder = placeholder ? placeholder : 'mm/dd/yyyy'
    return (
        <div id={id} className='input'>
            {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
            <input className={'datepicker input-box ' + (className || '')} type='text' placeholder={datePlaceHolder}/>
        </div>
    )
}

export default DatePicker;