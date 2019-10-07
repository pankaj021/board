var express = require('express');
var router = express.Router();
const {addANewMember, deleteAMember} = require('../data-operations/memberOperations');

router.post('/', (req, res, next) => {
    addANewMember(req.body)
    .then(member => res.status(200).json(member))
    .catch(next);
});

router.post('/delete', (req, res, next) => {
    deleteAMember(req.body)
    .then(member => res.status(200).json(member))
    .catch(next);
});
module.exports = router;
