import React from 'react';
import '../input/Input.css';

const Input = (props) => {
    const {label, className, placeholder, id, isRequired, value} = props;
    return (
        <div id={id} className='input'>
            {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
            <textarea className={'input-box ' + className} type='text' value={value} placeholder={placeholder}/>
        </div>
    )
}

export default Input;