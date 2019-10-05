import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Input, DropDown, ToggleButton, Button} from '../../pattern-library';
// import AdvanceSetting from './AdvanceSetting';
import * as boardActions from '../../actions/async/boardActions';
import {isValidBoardName} from '../../../validations/createBoardValidations';

class CreateBoard extends Component{
    constructor(){
        super();
        this.state = {isModalActive: false, boardName: "", boardType: "Standup", isBoardPublic: false, hasError: false};
        this.onClickExplore = this.onClickExplore.bind(this);
        this.onBoardTitleChange = this.onBoardTitleChange.bind(this);
        this.onBoardTypeChange = this.onBoardTypeChange.bind(this);
        this.toggleBtnClickHandler = this.toggleBtnClickHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }
    onClickExplore(){
        this.setState({isModalActive: true});
    }
    onBoardTitleChange(){
        let boardName = this.boardNameInput.value;
        let hasError = isValidBoardName(boardName) ? false : true;
        this.setState({boardName: this.boardNameInput.value, hasError});
    }
    onBoardTypeChange(){
        this.setState({boardType: this.boardTypeSelect.value})
    }
    toggleBtnClickHandler(){
        let isBoardPublic = this.isBoardPublic.value === 'true' ? true : false;
        this.setState({isBoardPublic});
    }
    createBoard(){
        if(isValidBoardName(this.state.boardName)) {
            this.props.createANewBoard({...this.state});
        } else {
            this.setState({hasError: true});
        }
    }
    render(){
        let {isModalActive, boardName, hasError} = this.state;
        let redirectTo = hasError ? '' : boardName;
        return(
            <div className='create-board fit-space'>
                <div className='create-board-box'>
                    <h4 className='h-font h-1'>Create a Board</h4>
                    <div className='board-config'>
                        <Input 
                            isRequired={true}
                            inputRef={ el => this.boardNameInput = el } 
                            placeholder="for example: lab-standup. Don't use space"
                            label='Board Title'
                            onChangeHandler={this.onBoardTitleChange}
                            hasError={hasError}
                            errorMsg={"Invalid name, don't use space."}
                        />
                        <DropDown 
                            label='Board Type' 
                            ddOptions={[
                                {text: "Standup", value: "Standup"},
                                {text: "Retro", value: "Retro"},
                                {text: "Normal", value: "Normal"}
                            ]}
                            ddRef={ el => this.boardTypeSelect = el }
                            onChangeHandler={this.onBoardTypeChange}
                        />
                        <ToggleButton 
                            label='Make it pubic ? '
                            toggleBtnRef={ el => this.isBoardPublic = el }
                            onClickHandler={this.toggleBtnClickHandler}
                        />
                        <div className='explore-tip'>
                            {/* <span><b>Note : </b>You can automate and manage things better by adding more details. We suggest you to <span className='sc-col setting-link' onClick={this.onClickExplore}>Explore</span> these settings. </span> */}
                            <span><b>Note : </b>You can automate and manage things better by adding more details once board is created.</span>
                        </div>
                        <Link to={`/${redirectTo}`} >
                            <Button text='Create Board' btnType='btn-pm' onClickHandler={this.createBoard}/>
                        </Link>
                    </div>
                </div>
                {/* <AdvanceSetting isActive={isModalActive}/> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createANewBoard: (boardInfo) => dispatch(boardActions.createANewBoard(boardInfo))
    }
}

export default connect(null, mapDispatchToProps)(CreateBoard);
