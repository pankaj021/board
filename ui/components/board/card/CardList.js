import React, { Component } from 'react';
import Card from './Card';
import ColumnInput from '../column/ColumnInput';

let CardList = ( props ) => {
    const headerCol = props.headerCol;
    return <div className='Card-list'>
        {
            props.cards.map( card => {
                if(card.isEdited) return (
                    <div className='card-edited' key={card._id}>
                        <ColumnInput {...card} btnText="Update" addedBy={card.addedBy || 'All'} />
                    </div>
                )
                return <Card key={card._id} card={card} headerCol={headerCol}/>
            })
        }
    </div>
}

export default CardList;
