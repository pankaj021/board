import React, { Component } from 'react';
import "./Column.css";

const ColumnHead = ({headerCol, columnName, cardCount}) => {
    return (
        <div className='column-head d-flex align-ct' style={{backgroundColor: headerCol}}>
            <div className='d-flex align-ct'>
                <div>{columnName || 'Column Title'}</div>
                <div>{` (${cardCount}) `}</div>
            </div>
            <img className='delete-icon' src='/icons/delete1.svg' title='Delete Column' alt='delete'/>
        </div>
    )
}

export default ColumnHead;
