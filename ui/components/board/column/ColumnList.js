import React, { Component } from 'react';
import Column from './Column';
import {hColorList, getRandomColorIndex} from '../../../helper/getColorList';
import "./Column.css"

let ColumnList = ( props ) => {
    const randomIndex = getRandomColorIndex();
    return <div className='column-list'>
        {
            props.columns.map( (column, id) => {
                const headerCol = hColorList[ ((randomIndex + id ) % hColorList.length)];
                return <Column key={column.columnId} index={id} column={column} headerCol={headerCol}/>
            })
        }
    </div>
}

export default ColumnList;
