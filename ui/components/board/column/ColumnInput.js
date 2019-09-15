import React, { Component } from 'react';
import {TextArea, DropDown, Button} from '../../../pattern-library';
import "./Column.css";

class ColumnInput extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div className='column-input'>
                <TextArea 
                    label='Content'
                    isRequired={true}
                />
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
                        <DropDown 
                            label='Expiry date'
                            ddOptions={[
                                {text: "Thiru", value: '001'},
                                {text: "pan ma", value: '001'},
                                {text: "hareshwar", value: '001'},
                                {text: "s suvendianan", value: '001'}
                            ]}
                        />
                    </div>
                    <Button text='Add' btnType='btn-sc' />
                </div>
            </div>
        )
    }
}

export default ColumnInput;
