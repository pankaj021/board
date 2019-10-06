import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input, Button} from '../../pattern-library';
import * as memberActions from '../../actions/async/memberActions';
import {validateMemberDetails, getNickName} from '../../../validations/addMemberValidations';
import ShowMemberList from './ShowMemberList';

class Members extends Component{
    constructor(){
        super();
        this.state = {fullName: "", nickName: "", nickNameError: false, fullNameError: false, nickNameFeed: "", fullNameMsg: "Invalid Name.", nickNameMsg: "Maximum 10 letters allowed."};
        this.addMemberHandler = this.addMemberHandler.bind(this);
        this.onBlurFullName = this.onBlurFullName.bind(this);
    }

    addMemberHandler(){
        let {isValid, fullNameMsg, nickNameMsg} = validateMemberDetails(this.fullName.value, this.nickName.value, this.props.members);
        if(isValid){
            this.props.addANewMember({
                "boardId": this.props.boardId || initialBoardData._id,
                "fullName": this.fullName.value.trim(), 
                "nickName": this.nickName.value.trim()
            })
            this.setState({
                fullNameMsg: "", nickNameMsg: "", fullNameError: false, nickNameError: false, fullName: "", nickName: ""
            })
        } else {
            this.setState({
                fullNameMsg, nickNameMsg, fullNameError: !!fullNameMsg, nickNameError: !!nickNameMsg
            })
        }
    }

    onBlurFullName(){
        let nickNameFeed = getNickName(this.fullName.value, this.props.members);
        console.log("nickNameFeed: ", nickNameFeed);
        
        if(nickNameFeed) this.setState({nickName: nickNameFeed, fullName: this.fullName.value || ""});
    }

    render(){
        let {nickName, fullName, nickNameError, nickNameMsg, fullNameError, fullNameMsg} = this.state;
        nickName = nickName.charAt(0).toUpperCase() + nickName.slice(1);
        return(
            <div>
                <div className='d-flex align-ct'>
                    <div className='d-flex align-ct wd-80'>
                        <div className='mg-r-10 wd-50'>
                            <Input 
                                isRequired={true}
                                inputRef={ el => this.fullName = el } 
                                placeholder="Type full name."
                                label='Full Name'
                                hasError={fullNameError}
                                errorMsg={fullNameMsg}
                                onBlurHandler={this.onBlurFullName}
                                value={fullName}
                            />
                        </div> 
                        <div className='mg-r-10 wd-50'>
                            <Input 
                                isRequired={true}
                                inputRef={ el => this.nickName = el } 
                                placeholder="Maximum 10 letters allowed."
                                label='Nick Name'
                                hasError={nickNameError}
                                errorMsg={nickNameMsg}
                                value={nickName}
                            />
                        </div>                   
                    </div>
                    <Button className='add-member-btn' text='Add' btnType='btn-sc' onClickHandler={this.addMemberHandler}/>
                </div>
                <ShowMemberList />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    members: state.members
})

const mapDispatchToProps = (dispatch) => ({
    addANewMember: (memberData) => dispatch(memberActions.addANewMember(memberData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Members);
