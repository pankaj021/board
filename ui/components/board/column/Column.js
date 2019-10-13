import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./Column.css";
import ColumnHead from './ColumnHead';
import ColumnInput from './ColumnInput';
import CardList from '../card/CardList';
import {getCardsByColumnId} from './helper';

class Column extends Component{
    constructor(){
        super();
    }
    
    render(){
        const {column, headerCol, cards} = this.props;
        const filteredCards = getCardsByColumnId(cards, column._id);
        let columnCss = this.props.index ? 'column' : 'column no-l-mg'
        return(
            <div className={columnCss}>
                <ColumnHead headerCol={headerCol} columnName={column.columnName} columnId={column._id}/>
                <ColumnInput columnId={column._id} columnName={column.columnName}/>
                <CardList cards={filteredCards} headerCol={headerCol}></CardList>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cards: state.board.cards
})

export default connect(mapStateToProps, null)(Column);
