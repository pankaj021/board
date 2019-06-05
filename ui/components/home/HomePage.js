import React, { Component } from 'react';
import CreateBoard from './CreateBoard';
import RecentBoard from './RecentBoard';

class HomePage extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className='home-page'>
                <RecentBoard />
                <CreateBoard/>
            </div>
        )
    }
}

export default HomePage;
