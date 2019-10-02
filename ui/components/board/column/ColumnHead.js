import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCardsByColumnId} from './helper';
import "./Column.css";

const ColumnHead = ({headerCol, columnName, columnId, cards}) => {
    const filteredCards = getCardsByColumnId(cards, columnId);
    return (
        <div className='column-head d-flex align-ct' style={{backgroundColor: headerCol}}>
            <div className='d-flex align-ct'>
                <div>{columnName || 'Column Title'}</div>
                <div>{` (${filteredCards.length}) `}</div>
            </div>
            <img className='delete-icon' src='/icons/delete1.svg' title='Delete Column' alt='delete'/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cards: state.board.cards
})
export default connect(mapStateToProps, null)(ColumnHead);
