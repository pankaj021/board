import React from 'react';
import {connect} from 'react-redux';
import Facilators from './Facilitators';
import Timer from './Timer';
import AdvanceSetting from '../settings/AdvanceSetting';
import './Header.css';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {settingActive: false};
        this.openSettingModal = this.openSettingModal.bind(this);
    }
    openSettingModal(){
        this.setState({settingActive: true});
    }
    render(){
        let {boardName, showHeaderItems} = this.props;
        return (
            <header className='header'>
                <div className='h-content'>
                    <div className='d-flex h-left-wrp'>
                        <div className='h-logo-wrp h-font mg-r-48'>
                            <a href='/'><img className='h-logo' src='/icons/favicon.ico' alt='CompoZed'/></a>
                            {boardName || 'X-Board'}
                        </div>
                        {showHeaderItems && <Facilators />}
                        {showHeaderItems && <Timer />}
                    </div>
                    {boardName && <div className='setting-wrp'>
                        <img src='/icons/setting.svg' alt='Settings' onClick={this.openSettingModal}/>
                        <AdvanceSetting isActive={this.state.settingActive && boardName}/>
                    </div>}
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    let {boardName} = state.board;
    if(boardName) boardName = boardName.charAt(0).toLocaleUpperCase() + boardName.slice(1);
    return {
        boardName,
        showHeaderItems: state.home.showHeaderItems
    };
}

export default connect(mapStateToProps, null)(Header);