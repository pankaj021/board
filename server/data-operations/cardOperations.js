let fs = require('fs');
const {Card} = require('../model/Card');
let { readJson, writeJson } = require('./helper');
const {INACTIVE_TIME} = require('../../constants');

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
    return new Promise((resolve, reject) => {
        let columnIds = [];
        let cardList = [];
        const cardPath = __dirname + '/../../data/cards.json';
        const columnPath = __dirname + '/../../data/column.json';
        selectedBoard.map(sBoard => {
            let columnIndex =  (sBoard.boardType === board.boardType && board.columnIndex) ? board.columnIndex : 0;
            let columnId = sBoard.columns[columnIndex];
            let newCard = Card({...card, columnId});            
            columnIds.push(columnId);
            cardList.push(newCard);
        });
        Promise.all([
            readJson(cardPath),
            readJson(columnPath)
        ]).then(data => {
            let cardData = data[0] ? data[0] : [];
            let columnData =  data[1] ? data[1] : [];
            cardData = cardList.concat(cardData);
            columnData = columnData.map(column => {
                let index = columnIds.indexOf(column._id);
                if(index !== -1) column.cards = [cardList[index]._id].concat(column.cards);
                return column;
            });
            Promise.all([
                writeJson(cardPath, cardData),
                writeJson(columnPath, columnData)
            ])
            .then(() => resolve(cardList))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function autoCleanData({boardName}) {
    const boardPath = __dirname + '/../../data/boards.json';
    const cardPath = __dirname + '/../../data/cards.json';
    const memberPath = __dirname + '/../../data/members.json';
    return new Promise((resolve, reject) => {
        Promise.all([
            readJson(boardPath),
            readJson(cardPath),
            readJson(memberPath)
        ])
        .then((data) => {
            let boardData = data[0] ? data[0] : [];
            let cardData = data[1] ? data[1] : [];
            let memberData = data[2] ? data[2] : [];
            let targetBoard = {};
            let targetColumns = [];
            for (let index = 0; index < boardData.length; index++) {
                if(boardData[index].boardName === boardName) {
                    targetBoard = boardData[index];
                    targetColumns = targetBoard.columns;
                    break;
                }
            }
            cardData = cardData.filter(card => {
                if(targetBoard.boardType === 'Standup' && card.columnId === targetColumns[1] && isFromLastDay(targetBoard.startedAt)){   // Temporary code, for auto deleting Interestings;
                    return false;
                }
                if(targetColumns.includes(card.columnId) && card.expiryDt){
                    let currentTime = new Date().setHours(0,0,0,0);    
                    let expiryTime = new Date(card.expiryDt).setHours(0,0,0,0);
                    return currentTime <= expiryTime; 
                }
                return true;
            });

            // if(isFromLastDay(targetBoard.startedAt)){
            //     memberData.forEach(member => {
            //         if(member.boardId === targetBoard._id) member.isPresent = true;  // reset not present list.
            //     })
            // }

            Promise.all([
                writeJson(cardPath, cardData),
                writeJson(memberPath, memberData)
            ])
            .then(() => resolve("Success"))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function isFromLastDay(startedAt) {
    let lastStartedTime = new Date(startedAt).getTime();
    let currentTime = new Date().getTime();
    return ((currentTime - lastStartedTime) > (INACTIVE_TIME || 12 * 60 * 60 * 1000));
}

module.exports = {addANewCard, deleteACard, updateCard, shareCard, autoCleanData};