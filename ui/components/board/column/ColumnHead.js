import React, { Component } from 'react';
import "./Column.css";

const ColumnHead = ({headerCol}) => {
    return (
        <div className='column-head d-flex align-ct' style={{backgroundColor: headerCol}}>
            <div className='d-flex align-ct'>
                <div>Helps</div>
                <div> (3) </div>
            </div>
            <img className='delete-icon' src='/icons/delete1.svg' title='Delete Column' alt='delete'/>
        </div>
    )
}

export default ColumnHead;
