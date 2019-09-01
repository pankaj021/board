import React, { Component } from 'react';
import "./Column.css";
import ColumnHead from './ColumnHead';
import ColumnInput from './ColumnInput';
import CardList from '../card/CardList';

class Column extends Component{
    constructor(){
        super();
    }
    
    render(){
        const {column, headerCol} = this.props;
        let columnCss = this.props.index ? 'column' : 'column no-l-mg'
        return(
            <div className={columnCss}>
                <ColumnHead headerCol={headerCol}/>
                <ColumnInput />
                <CardList cards={column.cards} headerCol={headerCol}></CardList>
            </div>
        )
    }
}

export default Column;
