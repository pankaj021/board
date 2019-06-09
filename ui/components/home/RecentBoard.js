import React, { Component } from 'react';
import {Input} from '../../pattern-library';

class RecentBoard extends Component{
    constructor(){
        super();
    }

    render(){
        const publicBoards = [
            "Lab-bengaluru",
            "lab-ani",
            "google-stand-up",
            "personal-tracker",
            "Yulu-Team-Standup",
            "Yatra-retro",
            "last-trip",
            'board-tracker',
            "Lab-bengaluru",
            "lab-ani",
            "google-stand-up",
            "personal-tracker",
            "Yulu-Team-Standup",
            "Yatra-retro",
            "last-trip",
            "Yatra-retro",
            "last-trip",
            'board-tracker'
        ]
        return(
            <aside className='recent-board fit-space'>
                <h4 className='h-font h-1'>Public Boards</h4>
                <Input label='' className='board-search' placeholder='Find a board...'/>
                <ul>
                    {
                        publicBoards.map((boardName, index) => <li key={index} className='board-item'><a href={boardName} className='txt-overflow'>{boardName}</a></li>)
                    }
                </ul>
            </aside>
        )
    }
}

export default RecentBoard;
