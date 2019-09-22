import React, { Component } from 'react';
import {connect} from 'react-redux';
import ColumnList from './column/ColumnList';

const Board = ({columns}) => {
    return(
        <div className='max-ht'>
            <ColumnList columns={columns}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        columns: state.board.columns
    }
}

export default connect(mapStateToProps, null)(Board);
