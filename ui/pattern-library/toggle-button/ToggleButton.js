import React, {Component} from 'react';
import './ToggleButton.css';

class ToggleButton extends Component{
    constructor(){
        super();
        this.state = { buttonSelected: 'No' }
        this.toggleBtnStyle = this.toggleBtnStyle.bind(this);
    }
    toggleBtnStyle(event){
        this.setState({buttonSelected: event.target.innerText});
    }
    render(){
        const {label} = this.props;
        const btnDisabledStyle = 'btn-disabled';
        let yesBtnStyle = 'btn-yes btn-seletecd ';
        let noBtnStyle = 'btn-no btn-seletecd '
        this.state.buttonSelected === 'No' ? yesBtnStyle += btnDisabledStyle : noBtnStyle += btnDisabledStyle;
        return (
            <div className='toggle-button'>
                <div className='d-flex align-ct'>
                    {label && <div className='h-font h-2 input-label'>{label + '*'}</div>}
                    <div className='btn-twin'>
                        <button className={yesBtnStyle} onClick={this.toggleBtnStyle}>Yes</button>
                        <button className={noBtnStyle} onClick={this.toggleBtnStyle}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToggleButton;