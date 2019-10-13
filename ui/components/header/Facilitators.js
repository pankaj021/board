import React from 'react';
import {connect} from 'react-redux';
import {Icon} from '../../pattern-library';
import {notPresent} from '../../actions/socket/socketActions';
import shortid from 'shortid';

let randomIdGenerator = () => (shortid.generate() + Math.ceil(100000000 * Math.random()));

class Facilitators extends React.Component{
    getPresentersList(){
        const {presenters, notPresent} = this.props;
        return presenters.map((presenter, index) => (
            <div key={randomIdGenerator()} className='presenter d-flex align-ct'>
                {index ? <span style={{margin: '0px 8px'}}>,</span> : null}
                <span className='mg-r-8'>{presenter.nickName || "Somebody"}</span>
                <Icon 
                    className='f-next-i' src='/icons/next.svg' alt='next' title="Not Present"
                    onClick={ () => notPresent({
                        presenters,
                        notPresentFacilitator: presenter,
                        boardId: initialBoardData._id
                    }) }
                />
            </div>
        ))
    }
    render(){
        const presenters = this.props.presenters;
        const imgPath = presenters.length > 1 ? '/icons/presenters.svg' : '/icons/presenter.svg';
        const imgClass = presenters.length > 1 ? 'f-logo' : 'f-logo-small'
        if(presenters && presenters.length === 2) {
            return (
                <div className='facilitators mg-r-48'>
                    <Icon className={imgClass} src={imgPath} alt='Facilitators' title='Facilitators'/>
                    <span className='facilitators-title'>Facilitators</span>
                    <span style={{margin: '0px 8px'}}>:</span>
                    <div className='presenters d-flex align-ct'>{this.getPresentersList()}</div>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    presenters: state.board.facilitators
})

const mapDispatchToProps = (dispatch) => ({
    notPresent: (reqData) => dispatch(notPresent(reqData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Facilitators);