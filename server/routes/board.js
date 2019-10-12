var express = require('express');
var router = express.Router();
let {isValidBoardName} = require('../../validations/createBoardValidations');
let {safelyCreateANewBoard, loadBoardData, loadAllPublicBoards} = require('../data-operations/boardOperations');

router.get('/', (req, res, next) => {
    loadAllPublicBoards()
    .then((publicBoards) => res.render('index', {boardData: JSON.stringify({homeRoute: true, publicBoards})}))
    .catch(next); 
});

router.get('/:boardName', (req, res, next) => {
    let {boardName} = req.params;
    if(!isValidBoardName(boardName)) return res.status(400).render('index', {boardData: JSON.stringify({message: "Invalid Board Name."})});
    Promise.all([
        loadAllPublicBoards(),
        loadBoardData(boardName)
    ])
    .then((data) => {
        let publicBoards = data[0];
        let boardData = data[1];
        res.status(200).render('index', {boardData: JSON.stringify({...boardData, publicBoards})});
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
