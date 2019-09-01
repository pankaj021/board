import React, { Component } from 'react';
import {Input, DropDown, ToggleButton} from '../../pattern-library';

class AdvanceSetting extends Component{
    constructor(props){
        super();
        this.state = {isActive: props.isActive};
        this.closeModal= this.closeModal.bind(this);
    }
    closeModal(){
        this.setState({isActive: false});
    }
    componentWillReceiveProps(props){
        this.setState({isActive: props.isActive});
    }
    render(){
        const {isActive} = this.state;
        if(!isActive) return null;
        return(
            <aside className='advance-setting fit-space'>
                <div className='h-font close-icon' title='close' onClick={this.closeModal}>X</div>
                <h4 className='h-font h-1'>Advance Setting</h4>
                <h3>
                    Not availble at the moment.
                </h3>
            </aside>
        )
    }
}

export default AdvanceSetting;
