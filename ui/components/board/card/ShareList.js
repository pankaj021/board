import React, { Component } from 'react';
import {connect} from 'react-redux';
import {shareCard} from '../../../actions/socket/socketActions'
import {Button} from '../../../pattern-library';

const getColumnindex = (columnId) => {
    for (let index = 0; index < initialBoardData.columns.length; index++) {
        const column = initialBoardData.columns[index];
        if(column._id === columnId) return index;
    }
    return 0;
}

class ShareList extends Component{
    constructor(props){
        super();
        this.state = {isActive: props.isActive, selectedList: []};
        this.closeList = this.closeList.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({isActive: true});
    }

    closeList(){
        this.setState({isActive: false, selectedList: []});
    }

    onChangeOption(event, board){
        let selectedList = this.state.selectedList;
        if(event.target.checked) {
            selectedList.push({...board, isSelected: true});
        } else {
            selectedList = this.state.selectedList.filter(selectedBoard => selectedBoard._id !== board._id);
        }
        this.setState({selectedList});
    }

    onClickShare(){
        let {shareCard, card} = this.props;
        if(this.state.selectedList.length){
            let board = {
                _id: initialBoardData._id,
                boardType: initialBoardData.boardType,
                columnIndex: getColumnindex(card.columnId)
            }
            shareCard({card, selectedBoard: this.state.selectedList, board});
            this.closeList();
        }
    }
    
    getShareBoardList(publicBoards){
        if(!publicBoards || publicBoards.length <= 0){
            return(
                <li className='input-pd'>No board availble.</li>
            )
        }
        return publicBoards.map(board => {
            if(board.boardName === initialBoardData.boardName) return null;
            return(
                <li key={board._id} className='input-pd d-flex align-ct'>
                    <input type='checkbox' ref={(el) => this.checkboxNode = el}
                        onChange={(event) => this.onChangeOption(event, board)}
                    />
                    <span className='mg-l-10'>{board.boardName}</span>
                </li>
            )
        })
    }

    render(){
        let {publicBoards} = this.props;
        if(this.state.isActive){
            return(
                <div className='share-modal'>
                    <h4 className='share-title'>{`Share it with (${this.state.selectedList.length})`}</h4>
                    <ul className='share-list'>
                        {this.getShareBoardList(publicBoards)}
                    </ul>
                    <div className='d-flex align-ct'>
                        <Button text='Share' className='share-btn' btnType='btn-sc' 
                            onClickHandler={this.onClickShare}
                        />
                        <Button text='Cancel' className='cancel-edit share-btn' btnType='btn-tr'
                            onClickHandler={this.closeList}
                        />
                    </div>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    publicBoards: state.home.publicBoards
})

const mapDispatchToProps = (dispatch) => ({
    shareCard: (shareData) => dispatch(shareCard(shareData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareList);
