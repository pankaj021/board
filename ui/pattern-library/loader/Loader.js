import React from 'react';
import './Loader.css';

function Loader({loadMsg}) {
    return (
        <div className='loader'>
            <div className='loader-wheel'></div>
            <h3>{loadMsg}</h3>
        </div>
    )
}

export default Loader;