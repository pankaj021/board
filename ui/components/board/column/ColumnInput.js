import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as socketActions from '../../../actions/socket/socketActions';
import {TextArea, DropDown, Button, DatePicker, Emoji, AutoComplete} from '../../../pattern-library';
import {getElementValue} from './helper';
import "./Column.css";

class ColumnInput extends Component{
    constructor(){
        super();
        this.state = {textAreaContent: ""}
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClickAddCard = this.onClickAddCard.bind(this);
        this.onSelectEmojiCallBack = this.onSelectEmojiCallBack.bind(this);
    }

    onClickAddCard(){
        const columnId = this.props.columnId;
        const content = getElementValue(this.contentNode);
        const addedby = getElementValue(this.addedByNode);
        const expiryDt = getElementValue(this.expiryNode);
        this.contentNode.value = '';
        this.addedByNode.value = '';
        this.expiryNode.value = '';
        if(content.trim()) this.props.addCard({columnId, content, addedby, expiryDt});
        else this.contentNode && this.contentNode.focus();   
    }

    onSelectEmojiCallBack(emojiValue){
        let allContent = this.contentNode.value + ' ' + emojiValue;
        this.setState({textAreaContent: allContent});
    }

    onKeyPress(){
        if(this.contentNode.value) this.props.userTypingHandler({columnId: this.props.columnId, typingMsg: this.contentNode.value});
    }
    
    render(){
        return(
            <div className='column-input'>
                <div className='content-wrp'>
                    <TextArea 
                        label='Content'
                        isRequired={true}
                        className='user-content'
                        textAreaRef={ el => this.contentNode = el } 
                        onKeyPressHandler={this.onKeyPress}
                        value={this.state.textAreaContent}
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
                            ddOptions={[
                                {text: "All", value: 'All'},
                                {text: "Thiru", value: '001'},
                                {text: "pan ma", value: '001'},
                                {text: "hareshwar", value: '001'},
                                {text: "s suvendianan", value: '001'}
                            ]}
                            value={''}
                        />
                        <AutoComplete 
                            id='assignedTo'
                            label='Assigned To'
                            placeholder="All"
                            className=''
                            autoCompleteRef={(el) => this.assignedToNode = el}
                            ddOptions={[
                                {text: "All", value: 'All'},
                                {text: "Thiru", value: '001'},
                                {text: "pan ma", value: '001'},
                                {text: "hareshwar", value: '001'},
                                {text: "s suvendianan", value: '001'}
                            ]}
                            value={''}
                        />
                        <DatePicker 
                            label='Expires On'
                            id='expiryDate'
                            dateRef={ el => this.expiryNode = el } 
                            value={""}
                        />
                    </div>
                    <Button text='Add' btnType='btn-sc' onClickHandler={this.onClickAddCard}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        userTypingHandler: (typingReq) => {dispatch(socketActions.userTyping(typingReq))},
        addCard: (cardReq) => {dispatch(socketActions.addCard(cardReq))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnInput);
