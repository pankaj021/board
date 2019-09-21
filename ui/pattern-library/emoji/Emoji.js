import React from 'react';
import './Emoji.css';

class Emoji extends React.Component{
    constructor(props){
        super();
        this.state = {isActive: false};
        this.getEmojiList = this.getEmojiList.bind(this);
        this.onClickEmojiIcon = this.onClickEmojiIcon.bind(this);
        this.handleEmojiListDisplay = this.handleEmojiListDisplay.bind(this);
    }

    componentDidMount(){
        document.addEventListener('click', () => {
            this.setState({isActive: false});
        });
    }

    getEmojiList(){
        var emojiList = ['0x1F600','0x1F603','0x1F601','0x1F606','0x1F605','0x1F923','0x1F602','0x1F642','0x1F643','0x1F609','0x1F607','0x1F60D','0x1F618','0x1F60B','0x1F61B','0x1F61C','0x1F917','0x1F914','0x1F910','0x1F60F','0x1F612','0x1F644','0x1F62C','0x1F614','0x1F62A','0x1F60E','0x1F913','0x1F61F','0x1F633','0x1F44C','0x1F44B','0x1F44D','0x1F44F','0x1F64F', '0x1F381', '0x1F382'];
        return emojiList.map((emoji, i) => (
            <span key={i} className='emoji-i'>
                {String.fromCodePoint(emoji)}
            </span>
        ));
    }

    handleEmojiListDisplay(event){
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }

    onClickEmojiIcon(event){
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if(this.state.isActive) return null;
        this.setState({isActive: true});
    }

    render(){
        const {className} = this.props;
        return (
            <div className='emoji-wrp'>
                <img className={'emoji-i ' + (className || '') } src='/icons/emoji.svg' alt='emoji' onClick={this.onClickEmojiIcon}/>
                {this.state.isActive && <span className='emoji-list' onClick={this.handleEmojiListDisplay}>
                    {this.getEmojiList()} 
                </span>}
            </div>
        )
    }
}

export default Emoji;