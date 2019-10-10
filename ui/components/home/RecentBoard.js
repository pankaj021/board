import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input} from '../../pattern-library';

function getFilteredBoard(publicBoards) {
    if(publicBoards.length){
        return (
            publicBoards.map((board, index) => (
                <li key={index} className='board-item'>
                    <div className='d-flex align-ct'>
                        <a href={board.boardName} className='txt-overflow'>
                            {` ${board.boardName}`}
                        </a>
                        {/* <span className='mg-l-10'>{`(${board.boardType.toLowerCase()} )`}</span> */}
                    </div>
                    <div className='d-flex align-ct'>
                        <img className='member-count-i' src='/icons/users.svg' alt='members'/>
                        <span>({board.noOfMembers})</span>
                    </div>
                </li>
            ))
        )
    }
    return <li>No board found.</li>
}

class RecentBoard extends Component{
    constructor(props){
        super();
        this.state = {publicBoards: props.publicBoards, typedValue: ""};
        this.onTypeBoardName = this.onTypeBoardName.bind(this);
    }
    onTypeBoardName(){
        let typedValue = this.searchBoardNode.value || "";
        typedValue = typedValue.trim();
        let filteredBoards = this.props.publicBoards.filter(board => board.boardName.toLowerCase().includes(typedValue.toLowerCase()));
        this.setState({
            typedValue,
            publicBoards: filteredBoards
        })
    }
    render(){
        const publicBoards = this.state.publicBoards;
        return(
            <aside className='recent-board fit-space'>
                <h4 className='h-font h-1'>{`Public Boards (${publicBoards.length}) `}</h4>
                <Input 
                    id='publicBoard'
                    label=''
                    placeholder='Find a board...'
                    className='board-search'
                    inputRef={(el) => this.searchBoardNode = el}
                    onChangeHandler={this.onTypeBoardName}
                    value={this.state.typedValue}
                />
                <ul>
                    {getFilteredBoard(publicBoards)}
                </ul>
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    publicBoards: state.home.publicBoards
})
export default connect(mapStateToProps, null)(RecentBoard);
