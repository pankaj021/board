import React from 'react';
import './Icon.css'

const Icon = (props) => {
    let title = props.title;
    return (
        <span className='img-icon'>
            <img {...props} title=''/>
            {title && <span className='img-title'>{title}</span>}
        </span>
    )
}

export default Icon;
