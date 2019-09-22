import React, { Component } from 'react';
import Card from './Card';

let CardList = ( props ) => {
    const headerCol = props.headerCol;
    return <div className='Card-list'>
        {props.cards.map( card => <Card key={card._id} card={card} headerCol={headerCol}/>)}
    </div>
}

export default CardList;
