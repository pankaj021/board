import React from 'react';
import './DatePicker.css';

class DatePicker extends React.Component{
    componentDidMount(){
        $( ".datepicker" ).datepicker({ 
            minDate: 0,
            maxDate: "+3M +10D",
        });
    }
    componentWillUnmount(){
        $(".datepicker").datepicker("disable");
    }

    render(){
        const {label, className, placeholder, id, isRequired, dateRef, value} = this.props;
        const datePlaceHolder = placeholder ? placeholder : 'mm/dd/yyyy';
        return (
            <div id={id} className='input'>
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
                <input 
                    className={'datepicker input-box ' + (className || '')} 
                    type='text'
                    placeholder={datePlaceHolder}
                    ref={dateRef}
                    value={value}
                    onChange={() => {}}
                />
            </div>
        )
    }
}

export default DatePicker;