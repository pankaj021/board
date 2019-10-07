import React, {Component} from 'react';
import './AutoComplete.css';

class AutoComplete extends Component{
    constructor(props){
        super();
        this.state = {
            value:  props.selectedItem || "",
            ddOptions: props.ddOptions,
            listOpen: false,
            itemlListStyle: {}
        };
        this.keyUpDownCount = 0
        this.getDdList = this.getDdList.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickDD = this.onClickDD.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    getMaxHeight(){
        return Math.min(window.innerHeight * .45 , 250);
    }

    componentDidMount(){
        document.addEventListener('click', (event) => { 
            this.setState({listOpen: false});         
        })
    }
    componentWillUnmount(){
        document.removeEventListener("click", () => {});
    }
    onChangeInput(event){
        this.keyUpDownCount = 0;
        const targetVal = event.target.value;
        let ddOptions = this.props.ddOptions;
        if(targetVal.length) ddOptions = this.props.ddOptions.filter(option => option.text.toUpperCase().includes(targetVal.toUpperCase()))
        this.setState({value: event.target.value, ddOptions, listOpen: true});
    }

    onKeyDown(event){
        const {ddOptions, listOpen} = this.state;
        if(!listOpen) return; //do nothing;
        if(event.key === 'Enter') return this.setState({listOpen: false}); // close the suggestion list.
        if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const selectItem = ddOptions[this.keyUpDownCount]['text'];
            let liCollection = this.suggestionList.children;
            for (let index = 0; index < liCollection.length; index++) {
                const element = liCollection[index];
                if(index === this.keyUpDownCount) element.classList.add('foucs-list');
                else element.classList.remove('foucs-list');
            }
            this.setState({value: selectItem || ""});
        }
        if(event.key === 'ArrowUp') this.keyUpDownCount = (this.keyUpDownCount + ddOptions.length - 1) % ddOptions.length;
        else if(event.key === 'ArrowDown') this.keyUpDownCount = (this.keyUpDownCount + 1) % ddOptions.length;
    }

    onClickDD(event){
        this.keyUpDownCount = 0;
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
        this.setState({value: selectedItem});
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
        const {errorText, placeholder, label, isRequired, id, className, autoCompleteRef} = this.props;
        const {value, ddOptions, listOpen, itemlListStyle} = this.state;
        const suggestions = this.getDdList(ddOptions);
        return (
            <div id={id} className='auto-complete' >
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
                <input 
                    type='text' 
                    className={'input-box ' + (className || '')} 
                    placeholder={placeholder} 
                    ref={autoCompleteRef}
                    value={value}
                    onChange={this.onChangeInput}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onClickDD}
                />
                { listOpen && suggestions.length ? <ul ref={(el) => this.suggestionList = el} style={itemlListStyle}>
                    {suggestions}
                </ul> : null}
                {/* {errorText && <div>{errorText}</div>} */}
            </div>
        )
    }
}

export default AutoComplete;