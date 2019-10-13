import React from 'react';
import {connect} from 'react-redux';
import {getTimeSinceStandUpStarted} from '../../helper/getTimeSinceStandUpStarted';

class ClapModal extends React.Component{
    constructor(props){
        super();
        this.counter = 1;
        this.interval = null;
        this.state = {isActive: props.triggerClap, counter: this.counter};
    }

    startCounter(){
        this.interval = setInterval(() => {
            ++this.counter;
            if(this.counter <= 9) this.setState({counter: this.counter});
            else{
                this.counter = 1;
                clearInterval(this.interval);
                this.setState({isActive: false, counter: this.counter});
            }
        }, 1000);
    }

    componentWillReceiveProps(props){
       clearInterval(this.interval);
       if(props.triggerClap) this.setState({isActive: props.triggerClap}, this.startCounter);
    }

    getClapInfo(){
        if(this.counter < 3) {
            return <span className='clap-count'>{this.counter}</span>
        } else if (this.counter === 3) {
            return <img className='clap-i' src='/icons/clap.svg' alt='Clap'/>
        } else if(this.props.nextFacilitators){
            return (
                <div className='next-facilitators'> 
                    <div>Next Facilitators: </div>
                    <div>{
                        this.props.nextFacilitators.map((facilitator, index) => index ? ` & ${facilitator.nickName}` : ` ${facilitator.nickName}`)
                    }</div>
                </div>
            )
        }
    }

    getDelayMsg(){
        // let {hh, mm, ss, isDelayed} = getTimeSinceStandUpStarted(this.props.initailValue, this.counter === 1);
        // console.log("isDelayed", isDelayed);
        // console.log("this.props.initailValue", hh, mm, ss);
        // if(isDelayed) return `It's delayed by ${hh} : ${mm} : ${ss}`;
        return null;
    }

    render(){
        if(this.state.isActive){
            return (
                <div className='clap-modal fit-space'>
                    <div className='clap-body'>
                        {
                            this.getClapInfo()
                        }
                        <div className='late-msg'>{this.getDelayMsg()}</div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    nextFacilitators: state.board.facilitators,
    triggerClap: state.timer.triggerClap,
    initailValue: state.timer.initailValue
})

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ClapModal);