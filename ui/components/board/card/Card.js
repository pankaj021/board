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
                <div className='card-head'>
                    <div className='add-info'>added today</div>
                    <div className='d-flex align-ct'>
                        <img className='card-icon' src='/icons/share.svg' title='share' alt='share'/>
                        <img className='mg-l-10 card-icon' src='/icons/edit.svg' title='edit' alt='edit'/>
                        <img className='mg-l-10 card-icon' src='/icons/delete.svg' title='delete' alt='delete'/>
                    </div>
                </div>
                <div className='card-main'>
                    <div>
                        <span className='f-500'>{addedBy}</span>
                        <span className='pd-lr-5 f-500'>:</span>
                    </div>
                    <span className='card-content'>
                        <span className='card-quote'>“</span>{`${content}`}<span className='card-quote'>”</span>
                    </span>
                </div>
                <div className='card-extras'>
                    <div className='card-expiry-dt'>- On Sat Sep 14</div>
                </div>
            </div>
        )
    }
}

export default Card;
