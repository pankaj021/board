import React from 'react';
import './Button.css';

const Button = (props) => {
    const {text, btnType, onClickHandler} = props;
    let btnClass = 'button';
    if(btnType) btnClass += ' ' + btnType;
    return (
        <button className={btnClass} onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default Button;