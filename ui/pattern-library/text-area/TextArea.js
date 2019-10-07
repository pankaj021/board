import React from 'react';
import '../input/Input.css';

class TextArea extends React.Component {
    constructor(props){
        super();
        this.state = {value: props.value || ""}
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event){
        this.setState({value: event.target.value});
    }

    componentWillReceiveProps(props){
        this.setState({value: props.value});
    }

    render(){
        const {label, className, placeholder, id, isRequired, onKeyPressHandler, textAreaRef} = this.props;
        return (
            <div id={id} className='input'>
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
                <textarea 
                    className={'input-box ' + (className || '')} 
                    type='text' 
                    placeholder={placeholder}
                    ref={textAreaRef}
                    onKeyPress={onKeyPressHandler}
                    onChange={this.onChange}
                    value={this.state.value || ""}
                />
            </div>
        )
    }
}

export default TextArea;