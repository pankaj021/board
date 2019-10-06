import React from 'react';
import './Button.css';

const Button = (props) => {
    const {text, btnType, onClickHandler, className} = props;
    let btnClass = 'button ' + (className || '');
    if(btnType) btnClass += ' ' + btnType;
    return (
        <button className={btnClass} onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default Button;