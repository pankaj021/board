let fs = require('fs');
const {Card} = require('../model/Card');
let { readJson, writeJson } = require('./helper');

function addANewCard(reqBody) {
    return new Promise((resolve, reject) => {
        let newCard = Card(reqBody);
        const cardPath = __dirname + '/../../data/cards.json';
        const columnPath = __dirname + '/../../data/column.json';
        Promise.all([
            readJson(cardPath),
            readJson(columnPath)
        ]).then(data => {
            let cardData = data[0] ? data[0] : [];
            let columnData = data[1];
            cardData.push(newCard);
            addInColumn(columnData, reqBody.columnId, newCard);
            Promise.all([
                writeJson(cardPath, cardData),
                writeJson(columnPath, columnData)
            ])
            .then( data => resolve(newCard))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function addInColumn(columnData, columnId, newCard) {
    for (let index = 0; index < columnData.length; index++) {
        let column = columnData[index];
        if(column._id === columnId) {
            let allCards = [newCard._id].concat(column.cards);
            column.cards = allCards;
            return;
        }
    }
}

function deleteACard(card) {
    return new Promise((resolve, reject) => {
        const cardPath = __dirname + '/../../data/cards.json';
        const columnPath = __dirname + '/../../data/column.json';
        Promise.all([
            readJson(cardPath),
            readJson(columnPath)
        ]).then(data => {
            let columnData = data[1];
            let cardData = data[0].filter( item => item._id !== card._id );
            deleteFromColumn(columnData, card.columnId, card._id);
            Promise.all([
                writeJson(cardPath, cardData),
                writeJson(columnPath, columnData)
            ])
            .then( data => resolve(card))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function deleteFromColumn(columnData, columnId, cardId) {
    for (let index = 0; index < columnData.length; index++) {
        const column = columnData[index];
        if(column._id === columnId){
            column.cards = column.cards.filter(id => cardId !== id);
            return;
        }
    }
}

module.exports = {addANewCard, deleteACard};