let fs = require('fs');
const {Board} = require('../model/Board');
const {Column} = require('../model/Column');
const {Timer} = require('../model/Timer');
let { readJson, getIndexOfBoard, writeJson } = require('./helper');

function safelyCreateANewBoard (reqBody) {
    const { boardName } = reqBody;
    const filePath = __dirname + '/../../data/boards.json';
    return new Promise((resolve, reject) => {
        readJson(filePath)
        .then(boardData => {
            if (boardData && getIndexOfBoard(boardName, boardData) > -1) return resolve({ message: `${boardName} : Board is already taken !!!` });
            getNewBoardInfo(reqBody, boardData)
            .then(newBoardinfo => resolve(newBoardinfo))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function getNewBoardInfo(reqBody, boardData) {
    const filePath = __dirname + '/../../data/boards.json';
    const newBoardinfo = Board(reqBody);
    // const timerInfo = Timer({boardId: newBoardinfo._id});
    return new Promise((resolve, reject) => {
        getBoardColumnList(reqBody.boardType, newBoardinfo._id)
        .then( columnList => {
            newBoardinfo.columns = columnList.map( column => column._id );
            if(!(boardData instanceof Array)) boardData = [];
            boardData.push(newBoardinfo);
            Promise.all([
                writeJson(filePath, boardData),
                writeJson(filePath, boardData)
            ])
            .then(data => {
                newBoardinfo.columns = columnList;  // setting entire column details after saving only id's.
                newBoardinfo.cards = [];
                return resolve(newBoardinfo);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function getBoardColumnList(boardType, boardId) {
    let columnList = [];
    const filePath = __dirname + '/../../data/Column.json';
    if(boardType === 'Standup'){
        const Column1 = Column({columnName: "Helps", boardId});
        const Column2 = Column({columnName: "Interestings", boardId});
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
            writeJson(filePath, columnData)
            .then(data => resolve(columnList))
            .catch(err => reject(err));
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
                const memberPath = __dirname + '/../../data/members.json';
                let boardResult = boardData[boardIndex];
                Promise.all([ 
                    readJson(columnPath), 
                    readJson(cardPath),
                    readJson(memberPath)
                ]).then(data => {
                    let columns = data[0];
                    let cards = data[1];
                    let memberData = data[2] || [];
                    if(!columns) throw new Error("Internal server error, no data found");
                    boardResult.cards = cards.filter(item => boardResult.columns.indexOf(item.columnId) > -1)
                    boardResult.columns = columns.filter(item => item.boardId === boardResult._id);
                    boardResult.members = memberData.filter(member => member.boardId === boardResult._id);
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

function loadAllPublicBoards() {
    const boardPath = __dirname + '/../../data/boards.json';
    const membersPath = __dirname + '/../../data/members.json';
    return new Promise((resolve, reject) => {
        Promise.all([
            readJson(boardPath),
            readJson(membersPath)
        ])
        .then((data) => {
            let boardData = data[0] || [];
            let memberData = data[1] || [];
            let filteredData = boardData.filter((board) => {
                board.noOfMembers = 0;
                return board.isPublic;
            });
            memberData.forEach(member => {
                for (let index = 0; index < filteredData.length; index++) {
                    let board = filteredData[index];
                    if(board._id === member.boardId) return ++board.noOfMembers;
                }
            });
            resolve(filteredData);
        })
        .catch(reject);
    })
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
            colmunResult.push(column);
        }
    })
    return colmunResult;
}

module.exports = {safelyCreateANewBoard, loadBoardData, loadAllPublicBoards};