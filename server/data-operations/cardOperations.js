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
            cardData = [newCard].concat(cardData);
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

function updateCard(card) {
    if(!card.addedBy) card.addedBy = 'All';
    return new Promise((resolve, reject) => {
        const cardPath = __dirname + '/../../data/cards.json';
        readJson(cardPath)
        .then(data => {
            let cardData = data ? data : [];
            for (let index = 0; index < cardData.length; index++) {
                if(cardData[index]._id === card._id) {
                    cardData[index] = card;
                    break;
                }
            }
            writeJson(cardPath, cardData)
            .then( data => resolve(card))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function shareCard(reqBody) {
    let {selectedBoard, card, board} = reqBody;
    selectedBoard = selectedBoard.slice(0, 1);  // The feature is partially available. 
    return new Promise((resolve, reject) => {
        let columnList = [];
        selectedBoard.map(sBoard => {
            let columnIndex =  sBoard.boardType === board.boardType && board.columnIndex ? board.columnIndex : 0;
            columnList.push(sBoard.columns[columnIndex]);
        });
        let promiseArr = columnList.map( columnId => {
            return addANewCard({
                ...card,
                columnId
            })
        })
        if(promiseArr.length) {
            Promise.all(promiseArr)
            .then((response) => resolve(response))
            .catch(err => reject(err));
        } else {
            throw new Error("Internal server error, we were not able to share.");
        }
        
    })
}

module.exports = {addANewCard, deleteACard, updateCard, shareCard};