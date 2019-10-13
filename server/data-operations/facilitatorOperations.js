let fs = require('fs');
let { readJson, writeJson } = require('./helper');
const NO_BODY = {
    "_id": "000000000000",
    "fullName": "Nobody Present",
    "nickName": "Nobody",
    "isPresent": true,
    "frequency": 0,
 };

function getRandomIndex(listLength) {
    return Math.floor(Math.random() * listLength);
}

function getFacilitatorList(boardFacilitators, members, noOfFacilitators) {
    let facilitators = [];
    if(boardFacilitators && boardFacilitators.length) return boardFacilitators;
    if(members && members.length >= noOfFacilitators) {
        let presentMembers = members.filter(member => member.isPresent).sort((a, b) => (a.frequency - b.frequency));
        console.log("presentMembers: ", presentMembers);
        
        if(presentMembers.length >= noOfFacilitators) {
            for (let index = 0; index < noOfFacilitators; index++) {
                facilitators.push(presentMembers[index]);   
            }
        }
    }
    console.log("facilitators", facilitators);
    
    return facilitators;
}

function updateFacilitatorList({presenters, notPresentFacilitator, boardId}) {
    const boardPath = __dirname + '/../../data/boards.json';
    const memberPath = __dirname + '/../../data/members.json';

    return new Promise((resolve, reject) => {
        Promise.all([
            readJson(boardPath),
            readJson(memberPath)  
        ])
        .then(data => {
            let boardData = data[0] ? data[0] : [];
            let membersData = data[1] ? data[1] : [];
            let remainingMembers = membersData.filter(member => {
                if(notPresentFacilitator._id === member._id) member.isPresent = false;
                let currentPresenter =  presenters.filter(presenter => presenter._id === member._id);
                const isNotCurrentPresenter = currentPresenter.length <= 0 ? true : false;
                return (member.boardId === boardId && member.isPresent && isNotCurrentPresenter);
            });
            let newPresenter = getFacilitatorList([], remainingMembers, 1)[0];

            let facilitators = presenters.map(presenter => {
                if(presenter._id === notPresentFacilitator._id) return newPresenter || NO_BODY;
                return presenter;
            });
            for (let index = 0; index < boardData.length; index++) {
                if(boardData[index]._id === boardId) {
                    boardData[index].facilitators = facilitators;
                    break;
                }
            }
            
            Promise.all([
                writeJson(boardPath, boardData),
                writeJson(memberPath, membersData)  
            ])
            .then(() => resolve(facilitators))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    }) 
}

function getNextFacilitatorList(board) {
    const memberPath = __dirname + '/../../data/members.json';
    return new Promise((resolve, reject) => {
        readJson(memberPath)
        .then(membersData => {
            if(membersData && membersData.length){
                let members = membersData.filter(member => member.boardId === board._id)
                members.forEach( facilitator => {
                    facilitator.isPresent = true;  // everyone is present for next event;
                    const currentPresenter = board.facilitators.filter(currentPresenter => currentPresenter._id === facilitator._id);
                    if(currentPresenter.length) facilitator.frequency += 1;
                })
                let newList = getFacilitatorList([], members, 2);
                writeJson(memberPath, membersData)
                .then(() => resolve(newList))
                .catch(err => reject(err))
            } else {
                throw new Error("Internal server error, Next Facilitator.")
            }
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getFacilitatorList,
    updateFacilitatorList,
    getNextFacilitatorList
}
