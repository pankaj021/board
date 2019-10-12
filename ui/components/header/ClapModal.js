import React from 'react';
import {connect} from 'react-redux';

class ClapModal extends React.Component{
    constructor(props){
        super();
        this.counter = 1;
        this.interval = null;
        this.state = {isActive: props.isActive, counter: this.counter};
    }

    startCounter(){
        this.interval = setInterval(() => {
            ++this.counter;
            if(this.counter <= 3) this.setState({counter: this.counter});
            else if(this.counter >= 9) {
                this.counter = 1;
                clearInterval(this.interval);
                this.setState({isActive: false, counter: this.counter});
            }
        }, 1000)
    }

    componentWillReceiveProps(props){
        this.setState({isActive: true}, this.startCounter);
    }

    getClapInfo(){
        if(this.counter < 3) {
            return <span className='clap-count'>{this.counter}</span>
        } else if (this.counter < 3) {
            return <img className='clap-i' src='/icons/clap.svg' alt='Clap'/>
        } else {
            return (
                <div className='next-facilitators'> 
                    <div>Next Facilitators: </div>
                    <div>Sonu & Monu</div>
                </div>
            )
        }
    }

    render(){
        if(this.state.isActive){
            return (
                <div className='clap-modal fit-space'>
                    <div className='clap-body'>
                        {
                            this.getClapInfo()
                        }
                        <div></div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ClapModal);