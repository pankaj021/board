import React, {Component} from 'react';
import './ToggleButton.css';

class ToggleButton extends Component{
    constructor(){
        super();
        this.state = { buttonSelected: "false" }
        this.toggleBtnStyle = this.toggleBtnStyle.bind(this);
    }
    toggleBtnStyle(event){
        let buttonSelected = event.target.innerText === 'Yes' ? "true" : "false";            
        this.setState({buttonSelected}, () => {
            if(this.props.onClickHandler) this.props.onClickHandler();
        });
    }
    onChangeHandler(){
        this.setState({value: this.state.buttonSelected});
    }
    render(){
        const {label, onClickHandler, toggleBtnRef, hasError, errorMsg} = this.props;
        const btnDisabledStyle = 'btn-disabled';
        let yesBtnStyle = 'btn-yes btn-seletecd ';
        let noBtnStyle = 'btn-no btn-seletecd '
        this.state.buttonSelected === "true" ? noBtnStyle += btnDisabledStyle : yesBtnStyle += btnDisabledStyle; 
        const errorClass = hasError && errorMsg ? ' visible' : ' hidden';        
        return (
            <div className='toggle-button'>
                <div className='d-flex align-ct'>
                    {label && <div className='h-font h-2 input-label'>{label + '*'}</div>}
                    <div className='btn-twin'>
                        <input
                            className='hide-field'
                            type='text'
                            value={this.state.buttonSelected} 
                            onChange={this.onChangeHandler}
                            ref={toggleBtnRef}
                        />
                        <button className={yesBtnStyle} onClick={this.toggleBtnStyle}>Yes</button>
                        <button className={noBtnStyle} onClick={this.toggleBtnStyle}>No</button>
                    </div>
                </div>
                {<div className={'error-label' + errorClass}>{errorMsg || 'Some Error.'}</div>}
            </div>
        )
    }
}

export default ToggleButton;