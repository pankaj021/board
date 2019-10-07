import React from 'react';
import './Tab.css'
import {getTitleList} from './helper';

class Tab extends React.Component {
    constructor(props){
        super();
        this.state = {
            currentTab: props.defaultTabIndex || 0
        }
        this.onSelectTab = this.onSelectTab.bind(this);
    }

    onSelectTab(selectedTab){
        this.setState({currentTab: selectedTab});
    }

    render(){
        let {currentTab} = this.state;
        let children = this.props.children;
        if(children && children.length) {
            let tabTitleList = children.map((tabItem, index) => tabItem.props.tabTitle || `Title${index}`);
            return (
                <div className='tab-component'>
                    <div className='tab-h-list'>
                        {getTitleList(tabTitleList, currentTab, this.onSelectTab)}
                    </div>
                    <div className='active-tab'>
                        {children[currentTab]}
                    </div>
                </div>
            )
        }
        return <div className='tab-component'>{children || null}</div>
    }
}

export default Tab;
