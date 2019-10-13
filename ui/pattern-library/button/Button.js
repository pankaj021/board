import React from 'react';
import './Button.css';

const Button = (props) => {
    const {text, btnType, onClickHandler, className, isDisabled} = props;
    const isDisabledClass = isDisabled ? ' disabled-btn ' : ""
    let btnClass = 'button ' + (className || '') + isDisabledClass;
    if(btnType) btnClass += ' ' + btnType;
    return (
        <button className={btnClass} onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default Button;