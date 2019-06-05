import React, {Component} from 'react';
import './AutoComplete.css';

class AutoComplete extends Component{
    constructor(props){
        super();
        this.state = {
            inputText:  props.selectedItem || "",
            ddOptions: props.ddOptions,
            listOpen: false,
            itemlListStyle: {}
        };
        this.getDdList = this.getDdList.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickDD = this.onClickDD.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    getMaxHeight(){
        return Math.min(window.innerHeight * .45 , 250);
    }

    componentDidMount(){
        document.addEventListener('click', (event) => { 
            this.setState({listOpen: false});         
        })
    }

    onChangeInput(event){
        const targetVal = event.target.value;
        let ddOptions = this.props.ddOptions;
        if(targetVal.length) ddOptions = this.props.ddOptions.filter(option => option.text.toUpperCase().includes(targetVal.toUpperCase()))
        this.setState({inputText: event.target.value, ddOptions, listOpen: true});
    }

    onClickDD(event){
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const rect = event.target.getBoundingClientRect();
        let itemlListStyle = {
            ...this.state.itemlListStyle, 
            transform: `translate(0px, 0px)`,
            top: '100%',
            maxHeight: this.getMaxHeight()
        };
        if(rect.top >= ( window.innerHeight / 2 )){
            itemlListStyle.transform = `translate(0px, -${this.getMaxHeight() + 4}px)`;
            itemlListStyle.top = '0px';
        }
        this.setState({listOpen: !this.state.listOpen, ddOptions: this.props.ddOptions, itemlListStyle});
    }

    selectItem(selectedItem){
        this.setState({inputText: selectedItem});
    }

    getDdList(ddOptions) {
        let optionArray = [];
        for (let index = 0; index < ddOptions.length; index++) {
            const {text, value} = ddOptions[index];
            if(text && value) optionArray.push(
                <li key={index} className='input-pd' value={value} onClick={() => this.selectItem(text)}>
                    {text}
                </li>
            );
            else throw new Error("Invalid Dropdown Option !!! \n Note: It should be in [{text: 'truthy', value: 'truthy'}] format.")
        }
        return optionArray;
    }

    render(){
        const {errorText, ddStyle, placeholder} = this.props;
        const {inputText, ddOptions, listOpen, itemlListStyle} = this.state;
        const suggestions = this.getDdList(ddOptions);
        return (
            <div id='dd-wrp' className='dd-wrap'>
                <div id='input-wrp' className='input-wrp input-pd' onClick={this.onClickDD}>
                    <input type='text' style={ddStyle} placeholder={placeholder} value={inputText} 
                        onChange={this.onChangeInput}/>
                </div>
                { listOpen && suggestions.length ? <ul style={itemlListStyle}>
                    {suggestions}
                </ul> : null}
                {/* {errorText && <div>{errorText}</div>} */}
            </div>
        )
    }
}

export default AutoComplete;