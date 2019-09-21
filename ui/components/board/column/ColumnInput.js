import React, { Component } from 'react';
import {TextArea, DropDown, Button, DatePicker, Emoji} from '../../../pattern-library';
import "./Column.css";

class ColumnInput extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div className='column-input'>
                <div className='content-wrp'>
                    <TextArea 
                        label='Content'
                        isRequired={true}
                        className='user-content'
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

export default ColumnInput;
