import React, { Component } from 'react';
import CreateBoard from './CreateBoard';
import RecentBoard from './RecentBoard';
import './HomePage.css';

class HomePage extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className='home-page fit-space d-flex'>
                <RecentBoard />
                <CreateBoard/>
            </div>
        )
    }
}

export default HomePage;
