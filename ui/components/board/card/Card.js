import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as socketActions from '../../../actions/socket/socketActions';
import {TextArea, DropDown, Button} from '../../../pattern-library';
import './Card.css';

function firstLetterUpperCase(content){
    if(content) return content.charAt(0).toUpperCase() + content.slice(1);
    return "";
}

class Card extends Component{
    constructor(props){
        super();
        this.state = {
            ...props.card
        }
    }
    
    render(){
        let {_id, addedby, content, expiryDt} = this.state; 
        let expiresOnTxt = expiryDt ? '- On ' + new Date(expiryDt).toDateString() : "";
        return(
            <div className='card column-input'>
                <div className='card-head'>
                    <div className='add-info'>added today</div>
                    <div className='d-flex align-ct'>
                        <img className='card-icon' src='/icons/share.svg' title='share' alt='share'/>
                        <img className='mg-l-10 card-icon' src='/icons/edit.svg' title='edit' alt='edit'/>
                        <img className='mg-l-10 card-icon' src='/icons/delete.svg' title='delete' alt='delete' 
                            onClick={() => this.props.deleteCard(this.state)}
                        />
                    </div>
                </div>
                <div className='card-main'>
                    <div>
                        <span className='added-by f-500'>{firstLetterUpperCase(addedby)}</span>
                        <span className='pd-lr-5 f-500'>:</span>
                    </div>
                    <span className='card-content'>
                        <span className='card-quote'>“</span>{`${firstLetterUpperCase(content)}`}<span className='card-quote'>”</span>
                    </span>
                </div>
                <div className='card-extras'>
                    <div className='card-expiry-dt'>{expiresOnTxt}</div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteCard: (card) => dispatch(socketActions.deleteCard(card))
})

export default connect(null, mapDispatchToProps)(Card);
