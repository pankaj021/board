import React from 'react';
import './Input.css';

const Input = (props) => {
    const {label, className, placeholder} = props;
    return (
        <div className='input'>
            {label && <div className='h-font h-2 input-label'>{label + ' *'}</div>}
            <input className={'input-box ' + className} type='text' placeholder={placeholder}/>
        </div>
    )
}

export default Input;