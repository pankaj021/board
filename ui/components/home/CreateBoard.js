import React, { Component } from 'react';
import {Input, DropDown, ToggleButton} from '../../pattern-library';

class CreateBoard extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className='create-board fit-space'>
                <div className='create-board-box'>
                    <h4 className='h-font h-1'>Create a Board</h4>
                    <div className='board-config'>
                        <Input placeholder='i.e. lab-standup, team-retro etc.' label='Board Title'/>
                        <DropDown label='Board Type' ddOptions={[
                            {text: "Standup", value: "Standup"},
                            {text: "Retro", value: "Retro"},
                            {text: "Normal", value: "Normal"}
                        ]}/>
                        <ToggleButton label='Make it pubic ? '/>
                        <div className='explore-tip'>
                            <span>You can automate and manage things better by adding more details. We suggest you to <span className='sc-col advance-setting'>Explore</span> these settings. </span>
                        </div>
                        <button className='create-board-btn pm-bg'>Create Board</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBoard;
