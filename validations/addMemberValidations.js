module.exports.validateMemberDetails = (fullName, nickName, memberList) => {
    let isValidObj = {isValid: false, fullNameMsg: "", nickNameMsg: ""};
    if(!fullName) isValidObj.fullNameMsg = "Invalid full name.";
    if(!nickName) isValidObj.nickNameMsg = "Invalid nick name.";
    let trimmedFullName = fullName.trim();
    let trimmedNickName = nickName.trim();
    if(!trimmedFullName) isValidObj.fullNameMsg = "Invalid full name.";
    if(!trimmedNickName) isValidObj.nickNameMsg = "Invalid nick name.";
    if(isValidObj.fullNameMsg || isValidObj.nickNameMsg) return isValidObj;

    if(!Array.isArray(memberList) && trimmedNickName.length <= 10) return {isValid: true}; // no member found.
    for (let index = 0; index < memberList.length; index++) {
        const member = memberList[index];
        const mFullName = member.fullName ? member.fullName.toLowerCase() : "";
        const mNickName = member.nickName ? member.nickName.toLowerCase() : "";
        if(mFullName === trimmedFullName.toLowerCase()) return {fullNameMsg: "Already exists."};
        if(mNickName === trimmedNickName.toLowerCase()) return {nickNameMsg: "Already exists."};
    }
    return {isValid: true};
}

module.exports.getNickName = (fullName, memberList) => {
    if(!fullName) return "";
    let trimmedFullName = fullName.trim();
    if(!trimmedFullName) return "";
    const fName = trimmedFullName.split(' ')[0] || "";
    const secName = trimmedFullName.split(' ')[1] || "";
    const thirdName = trimmedFullName.split(' ')[2] || "";
    
    // With First Name.
    if(fName){
        if(isValidNickName(fName, memberList)) return fName;
        const fNameThirdChar = fName + " " + (thirdName && thirdName.charAt(0));
        if(isValidNickName(fNameThirdChar, memberList)) return fNameThirdChar;
        const fNameSecChar = fName + " " + (secName && secName.charAt(0));
        if(isValidNickName(fNameSecChar, memberList)) return fNameSecChar;
    }

    // With third Name.
    if(thirdName){
        // if(isValidNickName(thirdName, memberList)) return thirdName;
        const tNameFChar = thirdName + " " + (fName && fName.charAt(0));
        if(isValidNickName(tNameFChar, memberList)) return tNameFChar;
        const tNameSChar = thirdName + " " + (secName && secName.charAt(0));
        if(isValidNickName(tNameSChar, memberList)) return tNameSChar;
    }

    // With Second Name.
    if(secName){
        // if(isValidNickName(secName, memberList)) return secName;
        const sNameFChar = secName + " " + (fName && fName.charAt(0));  
        if(isValidNickName(sNameFChar, memberList)) return sNameFChar;
        const sNameTChar = secName + " " + (thirdName && thirdName.charAt(0));
        if(isValidNickName(sNameTChar, memberList)) return sNameTChar;
    }

    return "";
}

function isValidNickName(nickName, memberList) {
    let trimmedNickName = nickName.trim();
    if(trimmedNickName && trimmedNickName.length <= 10){
        for (let index = 0; index < memberList.length; index++) {
            const member = memberList[index];
            const mNickName = member.nickName ? member.nickName.toLowerCase() : "";
            if(mNickName === trimmedNickName.toLowerCase()) return false;
        } 
        return true;
    }
    return false;
}