var express = require('express');
var router = express.Router();
let {isValidBoardName} = require('../../validations/createBoardValidations');
let {safelyCreateANewBoard} = require('../data-operations/createBoardOperations');
let {loadBoardData} = require('../data-operations/helper');

router.get('/', (req, res, next) => {
    res.render('index', {boardData: JSON.stringify({homeRoute: true})});
});

router.get('/:boardName', (req, res, next) => {
    let {boardName} = req.params;
    if(!isValidBoardName(boardName)) return res.status(400).render('index', {boardData: JSON.stringify({message: "Invalid Board Name."})});
    loadBoardData(boardName)
    .then(boardData => res.status(200).render('index', {boardData: JSON.stringify(boardData)}))
    .catch(next);  
})

router.post('/createBoard', (req, res, next) => {
    if(!isValidBoardName(req.body.boardName)) return res.status(400).json({message: "Invalid Board Name."});
    safelyCreateANewBoard(req.body)
    .then( boardInfo => res.status(200).json(boardInfo))
    .catch(next);    
});

module.exports = router;
