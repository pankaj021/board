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
            updateColumn(columnData, reqBody.columnId, newCard);
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

function updateColumn(columnData, columnId, newCard) {
    for (let index = 0; index < columnData.length; index++) {
        let column = columnData[index];
        if(column._id === columnId) {
            let allCards = [newCard._id].concat(column.cards);
            column.cards = allCards;
        }
    }
}

module.exports = {addANewCard};