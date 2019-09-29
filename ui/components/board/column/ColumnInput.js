import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as socketActions from '../../../actions/socket/columnSockets';
import {TextArea, DropDown, Button, DatePicker, Emoji} from '../../../pattern-library';
import "./Column.css";

class ColumnInput extends Component{
    constructor(){
        super();
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(){
        if(this.textAreaRef.value) this.props.userTypingHandler(this.textAreaRef.value);
    }
    
    render(){
        return(
            <div className='column-input'>
                <div className='content-wrp'>
                    <TextArea 
                        label='Content'
                        isRequired={true}
                        className='user-content'
                        textAreaRef={ el => this.textAreaRef = el } 
                        onKeyPressHandler={this.onKeyPress}
                    />
                    <Emoji className='content-emoji' />
                </div>
                <div className='d-flex'>
                    <div className='d-flex align-ct col-ip-dd'>
                        <DropDown 
                            id='addedBy'
                            label='Added by'
                            value=''
                            ddOptions={[
                                {text: "Thiru", value: '001'},
                                {text: "pan ma", value: '001'},
                                {text: "hareshwar", value: '001'},
                                {text: "s suvendianan", value: '001'}
                            ]}
                        />
                        <DatePicker 
                            label='Expires On'
                            id='expiryDate'
                        />
                    </div>
                    <Button text='Add' btnType='btn-sc' />
                </div>
            </div>
        )
    }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        userTypingHandler: (typingMsg) => {dispatch(socketActions.userTyping(typingMsg))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnInput);
