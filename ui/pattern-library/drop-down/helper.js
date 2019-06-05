import React from 'react';

function getDdOptions(ddOptions) {
    let optionArray = [];
    for (let index = 0; index < ddOptions.length; index++) {
        const {text, value} = ddOptions[index];
        if(text && value) optionArray.push(<option key={index} value={value}>{text}</option>);
        else throw new Error("Invalid Dropdown Option !!! \n Note: It should be in [{text: 'truthy', value: 'truthy'}] format.")
    }
    return optionArray;
}

module.exports = {
    getDdOptions
}


