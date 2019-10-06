let fs = require('fs');
const {Member} = require('../model/Member');
let { readJson, writeJson } = require('./helper');

function addANewMember(reqBody) {
    return new Promise((resolve, reject) => {
        let newMember = Member(reqBody);
        const path = __dirname + '/../../data/members.json';
        readJson(path)
        .then(data => {
            let memberData = data ? data : [];
            let findData = memberData.filter(member => (
                member.fullName.toLowerCase() === reqBody.fullName.toLowerCase() || 
                member.nickName.toLowerCase() === reqBody.nickName.toLowerCase()
            ))
            if(findData.length) return reject(new Error('Member already exists'));
            memberData.push(newMember);
            writeJson(path, memberData)
            .then( data => resolve(newMember))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

function deleteAMember(reqBody) {
    return new Promise((resolve, reject) => {
        const path = __dirname + '/../../data/members.json';
        readJson(path)
        .then(data => {
            let memberData = data ? data : [];
            let filteredData = memberData.filter(member => member._id !== reqBody._id);
            writeJson(path, filteredData)
            .then( data => resolve(reqBody))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
}

module.exports = {addANewMember, deleteAMember};