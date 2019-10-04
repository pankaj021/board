import React from 'react';
import './TypingIcon.css';

class TypingIcon extends React.Component{
    constructor(props){
        super();
        this.state = {isTyping: props.isTyping};
        this.clearTimerId = null;
    }
    componentWillReceiveProps(props){
        if(props.isTyping){
            clearTimeout(this.clearTimerId);
            this.setState({isTyping: true});
            this.clearTimerId = setTimeout(() => {
                this.setState({isTyping: false});
            }, props.duration || 3000);
        } 
    }
    render(){
        if(!this.state.isTyping) return null;
        return (
            <span className="wave">
                {/* <span style={{fontSize: '14px', fontStyle: "italic"}}>Typing </span> */}
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </span>            
        )
    }
}

export default TypingIcon;