import React from 'react';
import './Error.css';

function Error({errorMsg}) {
    return (
        <div className='error'>
            <h1>Oh snap...</h1>
            <h3>{errorMsg}</h3>
        </div>
    )
}

export default Error;