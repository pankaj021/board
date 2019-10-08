import React from 'react';
import './Input.css';

class Input extends React.Component{
    constructor(props){
        super();
        this.state = {value: props.value || ""};
        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        this.setState({value: event.target.value}, this.props.onChangeHandler);
    }
    componentWillReceiveProps(props){
        this.setState({value: props.value});
    }
    render(){
        const {label, className, hasError, errorMsg, placeholder, id, isRequired, inputRef, onChangeHandler, onKeyUpHandler, onBlurHandler} = this.props;
        const errorClass = hasError && errorMsg ? ' visible' : ' hidden';
        console.log('input render');
        return (
            <div id={id} className='input'>
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
                <input 
                    ref={inputRef}
                    className={'input-box ' + (className || '')} 
                    type='text' 
                    placeholder={placeholder}
                    onChange={this.onChange}
                    onKeyUp={onKeyUpHandler}
                    onBlur={onBlurHandler}
                    value={this.state.value || ""}
                />
                {<div className={'error-label' + errorClass}>{errorMsg || 'Some Error.'}</div>}
            </div>
        )
    }
}

export default Input;