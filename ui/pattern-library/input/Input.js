import React from 'react';
import './Input.css';

const Input = (props) => {
    const {label, className, hasError, errorMsg, placeholder, id, isRequired, inputRef, onChangeHandler, onKeyUpHandler} = props;
    return (
        <div id={id} className='input'>
            {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
            <input 
                ref={inputRef}
                className={'input-box ' + (className || '')} 
                type='text' 
                placeholder={placeholder}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
            />
            {hasError && errorMsg && <div className='error-label'>{errorMsg}</div>}
        </div>
    )
}

export default Input;