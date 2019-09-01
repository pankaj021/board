import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Input, DropDown, ToggleButton, Button} from '../../pattern-library';
import AdvanceSetting from './AdvanceSetting';

class CreateBoard extends Component{
    constructor(){
        super();
        this.state = {isModalActive: false};
        this.onClickExplore = this.onClickExplore.bind(this);
    }

    onClickExplore(){
        this.setState({isModalActive: true});
    }
    
    render(){
        let {isModalActive} = this.state;
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
                            {/* <span><b>Note : </b>You can automate and manage things better by adding more details. We suggest you to <span className='sc-col setting-link' onClick={this.onClickExplore}>Explore</span> these settings. </span> */}
                            <span><b>Note : </b>You can automate and manage things better by adding more details once board is created.</span>
                        </div>
                        <Link to={`/boardName`} >
                            <Button  text='Create Board' btnType='btn-pm'/>
                        </Link>
                    </div>
                </div>
                <AdvanceSetting isActive={isModalActive}/>
            </div>
        )
    }
}

export default CreateBoard;
