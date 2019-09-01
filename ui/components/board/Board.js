import React, { Component } from 'react';
import ColumnList from './column/ColumnList';

class Board extends Component{
    constructor(){
        super();
    }
    
    render(){
        let columns = [
            {columnId: 1, columnHd: "Change it", cards: [{cardId: 1, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 2, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 3, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}]},
            {columnId: 2, columnHd: "Change it", cards: [{cardId: 2, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 4, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}]},
            {columnId: 3, columnHd: "Change it", cards: [{cardId: 2, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 4, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}]},
            // {columnId: 4, columnHd: "Change it", cards: [{cardId: 2, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 4, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}]},
            // {columnId: 5, columnHd: "Change it", cards: [{cardId: 2, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}, {cardId: 4, content: 'this is temp data.', addedBy: "Manu", createTS: new Date()}]}
        ]
        return(
            <div className='max-ht'>
                <ColumnList columns={columns}/>
            </div>
        )
    }
}

export default Board;
