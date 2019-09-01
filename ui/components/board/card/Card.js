import React, { Component } from 'react';
import {TextArea, DropDown, Button} from '../../../pattern-library';
import './Card.css'

class Card extends Component{
    constructor(props){
        super();
        this.state = {
            ...props.card
        }
    }
    
    render(){
        let {cardId, addedBy, content} = this.state;
        return(
            <div className='card column-input'>
                <div className='d-flex align-ct'>
                    <div className='testAddedByDiv'><span className='testAddedBySpan'>Thiru</span></div>
                    : <div className='contentTest'>Hi its added by me. contact me after this.</div>
                </div>
                {/* <div className='d-flex'>
                    <div className='d-flex align-ct col-ip-dd'>
                        <DropDown 
                            id='addedBy'
                            label='Added by'
                            value={addedBy}
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
                </div> */}
            </div>
        )
    }
}

export default Card;
