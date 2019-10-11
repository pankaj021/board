import React, { Component } from 'react';
import './AdvanceSetting.css';
import Members from './Members';
import {Tab, TabItem} from '../../pattern-library';

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
                <div className='h-font close-icon' title='close' onClick={this.closeModal}>Close</div>
                {/* <h4 className='h-font h-1 h-setting'>Advance Setting</h4> */}
                <Tab defaultTabIndex={0}>
                    <TabItem tabTitle='Members'>
                        <Members />
                    </TabItem>
                    <TabItem tabTitle='Add Column'>Not available yet.</TabItem>
                    <TabItem tabTitle='Others'>Not available yet.</TabItem>
                </Tab>
            </aside>
        )
    }
}

export default AdvanceSetting;
