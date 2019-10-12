import React from 'react';
import {connect} from 'react-redux';
import * as socketActions from '../../actions/socket/socketActions';
import {Button} from '../../pattern-library';

class Timer extends React.Component{
    constructor(props){
        super();
        this.stopId = '';
        this.defaultState = {...props, isDelayed: props.isDelayed === true ? true : false};
        this.state = {...this.defaultState};
        this.formatWatchTime = this.formatWatchTime.bind(this);
        this.handleStopWatch = this.handleStopWatch.bind(this);
        this.upCounting = this.upCounting.bind(this);
        this.downCounting = this.downCounting.bind(this);
        this.counter = this.counter.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    componentDidMount(){
        this.handleStopWatch();
    }

    componentWillReceiveProps(receiveProps){
        this.handleStopWatch(receiveProps);
    }

    handleStopWatch(receiveProps){
        let {timerSarted, timerStopped} = receiveProps ? receiveProps : this.props;
        if(timerStopped) {
            clearInterval(this.stopId);
        } else if(timerSarted){
            this.stopId = setInterval( this.counter, 1000);
        } else {
            this.clearTimer();
        }
    }

    counter(){
        var {hh, mm, ss, isDelayed} = this.state;
        if(hh <= 0 && mm <= 0 && ss <= 0){
            isDelayed = this.state.isDelayed = true; 
        }
        if(isDelayed){
            hh >= 1 ? this.clearTimer() : this.upCounting();  // after 1 hour delay reset everything.
        }
        else{
            this.downCounting();
        }
    }

    downCounting(){
        var {hh, mm, ss} = this.state;
        ss--;
        if(ss < 0){
            ss = 59;
            mm--;
        }else {
            if(mm < 0){
                mm = 59;
                hh--;
            }
        }
        this.setState({hh, mm, ss});
    }

    upCounting(){
        var {hh, mm, ss} = this.state;
        ss++;
        if(ss >= 60){
            ss = 0;
            mm++;
        }else {
            if(mm === 60){
                mm = 0;
                hh++;
            }
        }
        this.setState({hh, mm, ss});
    }

    clearTimer(){
        clearInterval(this.stopId);
        this.setState({...this.props.initailValue, isDelayed: false, timerSarted: false, timerStopped: true});
    }

    doubleDigit(param){
        return param < 10 ? '0' + param : param;
    }

    formatWatchTime(){
        return " " + (this.doubleDigit(this.state.hh) + ':' + this.doubleDigit(this.state.mm) + ':' + this.doubleDigit(this.state.ss));
    }

    render(){
        let {timerBtnText, timerStoppedHandler, timerClickedHandler} = this.props;
        return (
            <div className='timer d-flex start-event-wrp mg-r-48'>
                <span>
                    <img 
                        className='t-logo' 
                        src='/icons/stopwatch3.svg' 
                        alt='Timer' title='Stop Timer'
                        onClick={timerStoppedHandler}
                    />
                </span>
                <span className='timer-text d-flex align-ct'>
                    <span style={{ fontSize: '22px', paddingRight: this.state.isDelayed ? '5px' : '0px'}}>{this.state.isDelayed ? ' - ' : " "}</span>
                    <span className='timer-val'> { this.formatWatchTime() } </span>
                    <Button 
                        text={timerBtnText ||"Let's Start"} 
                        btnType='btn-pm' 
                        onClickHandler={timerClickedHandler}
                    />
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.timer
});

const mapDispatchToProps = (dispatch) => ({
    timerClickedHandler: () => dispatch(socketActions.timerClicked()),
    timerStoppedHandler: () => dispatch(socketActions.timerStopped())
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);