import React, { Component } from 'react';
import {connect} from 'react-redux';
import shortid from 'shortid';
import Linkify from 'react-linkify'
import * as socketActions from '../../../actions/socket/socketActions';
import * as cardActions from '../../../actions/sync/cardActions';
import {Icon} from '../../../pattern-library';
import ShareList from './ShareList';
import './Card.css';

function firstLetterUpperCase(content){
    if(content) return content.charAt(0).toUpperCase() + content.slice(1);
    return "";
}

function formatDate(date){
    let today = new Date();
    if(date) {
        let inputDate = new Date(date);
        if(inputDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)) return 'today';
        else if(inputDate.setHours(0,0,0,0) - today.setHours(0,0,0,0) === 86400000 ) return 'tomorrow'
        else if(today.setHours(0,0,0,0) - inputDate.setHours(0,0,0,0) === 86400000 ) return 'yesterday'
        else return ( 'on ' + inputDate.toDateString().split(' ').slice(0, 3).join(" "))
    }
}

let randomIdGenerator = () => (shortid.generate() + Math.ceil(100000000 * Math.random()));

class Card extends Component{
    constructor(props){
        super();
        this.state = {
            ...props.card,
            isActive: false
        }
        this.onClickShare = this.onClickShare.bind(this);
    }

    onClickShare(){
        this.setState({isActive: randomIdGenerator()});
    }
    
    render(){
        let {_id, addedBy, content, expiryDt, addedDt, isActive, columnId} = this.state; 
        let expiresOnTxt = '';
        if(expiryDt) {
            if(formatDate(expiryDt).includes('yesterday')) return null;   // don't display that item.
            expiresOnTxt = expiryDt ? '- Expires ' + formatDate(expiryDt) : "";
        }
        let addedDtTxt = addedDt ? 'Added ' + formatDate(addedDt) : "";
        return(
            <div className='card column-input'>
                <div className='card-head'>
                    <div className='add-info'>{`${addedDtTxt}` || ""}</div>
                    <div className='d-flex align-ct'>
                        <span className='share-it'>
                            <Icon className='card-icon' src='/icons/share-new1.svg' title='share card' alt='share'
                                onClick={this.onClickShare}
                            />
                            {<ShareList key={_id} card={{_id, addedBy, content, expiryDt, addedDt, columnId}} isActive={isActive}/>}
                        </span>
                        <Icon className='mg-l-10 card-icon' src='/icons/edit.svg' title='edit card' alt='edit'
                            onClick={() => this.props.editCard(this.state)}
                        />
                        <Icon className='mg-l-10 card-icon' src='/icons/delete.svg' title='delete card' alt='delete' 
                            onClick={() => this.props.deleteCard(this.state)}
                        />
                    </div>
                </div>
                <div className='card-main'>
                    <div>
                        <span className='added-by f-500'>{firstLetterUpperCase(addedBy)}</span>
                        <span className='pd-lr-5 f-500'>:</span>
                    </div>
                    <span className='card-content'>
                        <Linkify>
                            <span className='card-quote'>“</span>{`${firstLetterUpperCase(content)}`}<span className='card-quote'>”</span>
                        </Linkify>
                    </span>
                </div>
                <div className='card-extras'>
                    <div className='card-expiry-dt'>{`${expiresOnTxt}` || ""}</div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteCard: (card) => dispatch(socketActions.deleteCard(card)),
    editCard: (card) => dispatch(cardActions.editCard(card))
})

export default connect(null, mapDispatchToProps)(Card);
