const fs = require('fs');
const {Board} = require('../model/Board');
const {Column} = require('../model/Column');

function getIndexOfBoard(boardName, boardData) {
    if(boardData instanceof Array){
        for (let index = 0; index < boardData.length; index++) {
            if(boardData[index].boardName === boardName){
                return index;
            }
        }
    }
    return -1;
}

function readJson(filePath){
    return new Promise ((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) return reject(err);
            let parseData = null;
            try {
                parseData = data ? JSON.parse(data) : null;                
            } catch (error) {
                return reject(error);
            }
            resolve(parseData);
        })
    })
}

function getNewBoardInfo(reqBody, boardData) {
    const filePath = __dirname + '/../../data/boards.json';
    const newBoardinfo = Board(reqBody);
    return new Promise((resolve, reject) => {
        getBoardColumnList(reqBody.boardType, newBoardinfo._id)
        .then( columnList => {
            newBoardinfo.columns = columnList.map( column => column._id );
            if(!(boardData instanceof Array)) boardData = [];
            boardData.push(newBoardinfo);
            fs.writeFile(filePath, JSON.stringify(boardData, null, 3), 'utf8', (err) => {
                if (err) return reject(err);
                newBoardinfo.columns = columnList;  // setting entire column details after saving only id's.
                return resolve(newBoardinfo);
            });
        })
        .catch(err => reject(err));
    })
}

function getBoardColumnList(boardType, boardId) {
    let columnList = [];
    const filePath = __dirname + '/../../data/Column.json';
    if(boardType === 'Standup'){
        const Column1 = Column({columnName: "Helps", boardId});
        const Column2 = Column({columnName: "Interesting", boardId});
        const Column3 = Column({columnName: "Events", boardId});
        columnList = [Column1, Column2, Column3];
    } else {
        const Column1 = Column({columnName: "Happy", boardId});
        const Column2 = Column({columnName: "Meh", boardId});
        const Column3 = Column({columnName: "Frowny", boardId});
        const Column4 = Column({columnName: "Action Items", boardId});
        columnList = [Column1, Column2, Column3, Column4];
    } 
    return new Promise ((resolve, reject) => {
        readJson(filePath)
        .then(columnData => {
            if(!(columnData instanceof Array)) columnData = [];
            columnData = [...columnData, ...columnList];
            fs.writeFile(filePath, JSON.stringify(columnData, null, 3), 'utf8', (err) => {
                if (err) return reject(err);
                return resolve(columnList);
            });
        })
        .catch(err => reject(err));
    })
}

function loadBoardData(boardName) {
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise ((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            let boardIndex = getIndexOfBoard(boardName, boardData);
            if(boardData && boardIndex > -1) {
                const columnPath = __dirname + '/../../data/column.json';
                const cardPath = __dirname + '/../../data/cards.json';
                let boardResult = boardData[boardIndex];
                Promise.all(
                    [ 
                        readJson(columnPath), 
                        readJson(cardPath)
                    ]
                ).then((columns, cards) => {
                    if(!columns) throw new Error("Internal server error, no data found");
                    // boardResult.columns = getConsolidatedColumns(boardResult, columns, cards);
                    resolve(boardResult);
                })
                .catch(err => reject(err));  
            } else {
                return reject(new Error("Board does not exists"));
            }
        })
        .catch(err => reject(err));  
    });
}

function getConsolidatedColumns(boardResult, columns, cards) {
    let boardColumns = boardResult.columns;
    let colmunResult = [];
    columns.forEach(column => {
        if(boardColumns.indexOf(column._id) > -1){
            if(!cards) return colmunResult.push(column);
            let columnCards = column.cards;
            let cardResult = [];
            cards.forEach(card => {
                if(columnCards.indexOf(card._id) > -1) cardResult.push(card);
            })
            column.cards = cardResult;
        }
    })
    return cardResult;
}

module.exports = { getIndexOfBoard, readJson, getNewBoardInfo, loadBoardData };