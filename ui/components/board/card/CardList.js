import React, { Component } from 'react';
import shortid from 'shortid';
import Card from './Card';
import ColumnInput from '../column/ColumnInput';

let randomIdGenerator = () => (shortid.generate() + Math.ceil(100000000 * Math.random()));

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
                return <Card key={randomIdGenerator()} card={card} headerCol={headerCol}/>
            })
        }
    </div>
}

export default CardList;
