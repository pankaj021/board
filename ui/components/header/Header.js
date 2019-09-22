import React from 'react';
import {connect} from 'react-redux';
import './Header.css';

function Header({boardName}) {
    return (
        <header className='header'>
            <div className=''>
                <div className=''>
                    <div className='h-font'>
                        {boardName || 'X-Board'}
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    let {boardName} = state.board;
    if(boardName) boardName = boardName.charAt(0).toLocaleUpperCase() + boardName.slice(1);
    return {boardName};
}

export default connect(mapStateToProps, null)(Header);