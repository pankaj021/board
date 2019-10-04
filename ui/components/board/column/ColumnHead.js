import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TypingIcon} from '../../../pattern-library';
import {getCardsByColumnId} from './helper';
import "./Column.css";

const ColumnHead = ({headerCol, columnName, columnId, cards, typingData}) => {
    const filteredCards = getCardsByColumnId(cards, columnId);
    const isTyping = typingData.columnId === columnId;
    return (
        <div className='column-head d-flex align-ct' style={{backgroundColor: headerCol}}>
            <div className='d-flex align-ct'>
                <div>{columnName || 'Column Title'}</div>
                <div>{` (${filteredCards.length}) `}</div>
            </div>
            <TypingIcon isTyping={isTyping} duration={3000}/>
            <img className='delete-icon' src='/icons/delete1.svg' title='Delete Column' alt='delete'/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cards: state.board.cards,
    typingData: state.userTyping
})
export default connect(mapStateToProps, null)(ColumnHead);
