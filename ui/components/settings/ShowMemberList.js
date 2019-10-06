import React from 'react';
import {connect} from 'react-redux';
import * as memberActions from '../../actions/async/memberActions';

class ShowMemberList extends React.Component{
    getMemberList(){
        if(!this.props.members || this.props.members.length < 1) return <div className='explore-tip'>No Members added yet for the board.</div>
        return this.props.members.map(member => (
            <span
                key={member._id}
                className='member'
            >
                <div>
                    <div className='nick-name'>{member.nickName || "Some Error"}</div>
                    <div className='full-name'>{member.fullName || "Some Error"}</div>
                </div>
                <span 
                    className='delete-member' title='Delete Member' 
                    onClick={() => this.props.deleteAMember(member)}
                >
                    X
                </span>
            </span>
        ))
    }
    render(){
        return (
            <div className='member-list'>
                {this.getMemberList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    members: state.members
})

const mapDispatchToProps = (dispatch) => ({
    deleteAMember: (data) => dispatch(memberActions.deleteAMember(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowMemberList);