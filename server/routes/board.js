var express = require('express');
var router = express.Router();
let {isValidBoardName} = require('../../validations/createBoardValidations');
let {safelyCreateANewBoard} = require('../data-operations/createBoardOperations');
let {readJson, getIndexOfBoard} = require('../data-operations/helper');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/:boardName', (req, res, next) => {
    let {boardName} = req.params;
    if(!isValidBoardName(boardName)) return res.status(400).json({message: "Invalid Board Name."});
    const filePath = __dirname + '/../../data/boards.json';
    readJson(filePath)
    .then(boardData => {
        let boardIndex = getIndexOfBoard(boardName, boardData);
        if(boardData && boardIndex > -1) res.status(200).json(boardData[boardIndex]);
        else res.status(404).json({message: "Board does not exists"});
    })
    .catch(next);    
})

router.post('/createBoard', (req, res, next) => {
    if(!isValidBoardName(req.body.boardName)) return res.status(400).json({message: "Invalid Board Name."});
    safelyCreateANewBoard(req.body)
    .then( boardInfo => res.status(200).json(boardInfo))
    .catch(next);    
});

module.exports = router;
