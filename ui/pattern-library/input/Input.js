import React from 'react';
import './Input.css';

const Input = (props) => {
    const {label, className, placeholder, id, isRequired} = props;
    return (
        <div id={id} className='input'>
            {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
            <input className={'input-box ' + className} type='text' placeholder={placeholder}/>
        </div>
    )
}

export default Input;