import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as socketActions from '../../../actions/socket/socketActions';
import * as cardActions from '../../../actions/sync/cardActions';

import {TextArea, DropDown, Button, DatePicker, Emoji, AutoComplete} from '../../../pattern-library';
import {getElementValue} from './helper';
import "./Column.css";
const defaultState = {content: "", addedBy: "", expiryDt: "", assignedTo: ""};
const getDDOptions = (members) => {
    const defaultOption = [{text: "All", value: 'All'}];
    let ddOptions = [];
    if(members) {
        ddOptions = members.map(member => ({
            text: member.fullName || 'Some Name', value: member.nickName || 'Somebody'
        }))
    }
    return defaultOption.concat(ddOptions);
}

class ColumnInput extends Component{
    constructor(props){
        super();
        let initialState = props.content ? props : defaultState;
        this.state = {...initialState};
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClickAddCard = this.onClickAddCard.bind(this);
        this.onSelectEmojiCallBack = this.onSelectEmojiCallBack.bind(this);
    }

    onClickAddCard(){
        const columnId = this.props.columnId;
        const content = getElementValue(this.contentNode);
        const addedBy = getElementValue(this.addedByNode);
        const expiryDt = getElementValue(this.expiryNode);
        const assignedTo = getElementValue(this.assignedToNode) || null;
        const {addCard, updateCard, btnText, _id, isEdited} = this.props;
        if(content.trim()) {
            this.expiryNode.value = '';
            if(isEdited) updateCard({columnId, content, addedBy, expiryDt, assignedTo, _id});
            else addCard({columnId, content, addedBy, expiryDt, assignedTo});
            this.setState({...defaultState});
        }
        else this.contentNode && this.contentNode.focus();   
    }

    onSelectEmojiCallBack(emojiValue){
        let allContent = this.contentNode.value + ' ' + emojiValue;
        this.setState({content: allContent});
    }

    onKeyPress(){
        if(this.contentNode.value) this.props.userTypingHandler({columnId: this.props.columnId, typingMsg: this.contentNode.value});
    }
    
    render(){
        let {content, addedBy, expiryDt, assignedTo} = this.state;
        let btnText = this.props.btnText || 'Add';
        return(
            <div className='column-input'>
                <div className='content-wrp'>
                    <TextArea 
                        label='Content'
                        isRequired={true}
                        className='user-content'
                        textAreaRef={ el => this.contentNode = el } 
                        onKeyPressHandler={this.onKeyPress}
                        value={content}
                    />
                    <Emoji 
                        className='content-emoji' 
                        emojiRef={ el => this.emojiNode = el } 
                        onSelectEmojiCallBack={this.onSelectEmojiCallBack}
                    />
                </div>
                <div className='d-flex'>
                    <div className='d-flex align-ct col-ip-dd'>
                        <AutoComplete 
                            id='addedBy'
                            label='Added by'
                            placeholder="All"
                            className=''
                            autoCompleteRef={(el) => this.addedByNode = el}
                            ddOptions={getDDOptions(this.props.members)}
                            value={addedBy || ""}
                        />
                        {/* <AutoComplete 
                            id='assignedTo'
                            label='Assigned To'
                            placeholder="All"
                            className=''
                            autoCompleteRef={(el) => this.assignedToNode = el}
                            ddOptions={getDDOptions(this.props.members)}
                            value={assignedTo || ""}
                        /> */}
                        <DatePicker 
                            label='Expires On'
                            id='expiryDate'
                            dateRef={ el => this.expiryNode = el } 
                            value={expiryDt || ''}
                        />
                    </div>
                    <Button text={btnText} btnType='btn-sc' onClickHandler={this.onClickAddCard}/>
                    {
                        this.props.isEdited &&
                        <Button text='Cancel' className='cancel-edit' btnType='btn-tr' 
                            onClickHandler={() => {this.props.cancelEdit({_id: this.props._id})}}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    members: state.members
});

const mapDispatchToProps = (dispatch) => {
    return {
        userTypingHandler: (typingReq) => {dispatch(socketActions.userTyping(typingReq))},
        addCard: (cardReq) => {dispatch(socketActions.addCard(cardReq))},
        updateCard: (cardReq) => {dispatch(socketActions.updateCard(cardReq))},
        cancelEdit: (cardReq) => {dispatch(cardActions.cancelEdit(cardReq))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnInput);
