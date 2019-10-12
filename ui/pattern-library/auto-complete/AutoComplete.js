import React, {Component} from 'react';
import './AutoComplete.css';

class AutoComplete extends Component{
    constructor(props){
        super();
        this.state = {
            value:  props.selectedItem || props.value || "",
            ddOptions: props.ddOptions,
            itemlListStyle: {}
        };
        this.keyUpDownCount = 0
        this.getDdList = this.getDdList.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickDD = this.onClickDD.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.showList = this.showList.bind(this);
        this.removeList = this.removeList.bind(this);
    }

    getMaxHeight(){
        return Math.min(window.innerHeight * .45 , 160);
    }

    removeList(){
        this.suggestionList && this.suggestionList.classList.remove('show-list');
        this.suggestionList && this.suggestionList.classList.add('hide-list');
    }

    showList(){
        this.suggestionList && this.suggestionList.classList.remove('hide-list');
        this.suggestionList && this.suggestionList.classList.add('show-list');
    }

    componentDidMount(){
        document.addEventListener('click', (event) => this.suggestionList && this.removeList())
    }
    componentWillReceiveProps(props){
        this.setState({value: props.value});
    }
    componentWillUnmount(){
        document.removeEventListener("click", () => {});
    }
    onChangeInput(event){
        this.keyUpDownCount = 0;
        const targetVal = event.target.value;
        let ddOptions = this.props.ddOptions;
        if(targetVal.length) ddOptions = this.props.ddOptions.filter(option => option.value.toUpperCase().includes(targetVal.toUpperCase()))
        this.showList();
        this.setState({value: event.target.value, ddOptions});
    }

    onKeyDown(event){  // UI issue
        const ddOptions = this.state.ddOptions.slice(0, 4);
        if(event.key === 'Enter') return this.removeList(); // close the suggestion list.
        if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const selectItem = ddOptions[this.keyUpDownCount]['value'];
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
        const suggestions = this.getDdList(this.props.ddOptions);

        let itemlListStyle = {
            top: "unset",
            maxHeight: this.getMaxHeight(),
            bottom: '36px',
            left: 0,
            right: 0,
        };
        // if(rect.top >= ( window.innerHeight / 2 )){
        //     itemlListStyle = {
        //         top: "unset",
        //         maxHeight: this.getMaxHeight(),
        //         bottom: "35px",
        //         left: 0,
        //         right: 0,
        //     }
        // }
        if(this.suggestionList && this.suggestionList.classList.contains('hide-list')) this.showList();
        else this.removeList();
        this.setState({ddOptions: this.props.ddOptions, itemlListStyle});
    }

    selectItem(selectedItem){
        this.setState({value: selectedItem});
    }

    getDdList(ddOptions) {
        let optionArray = [];
        for (let index = 0; index < ddOptions.length; index++) {
            const {text, value} = ddOptions[index];
            if(text && value) optionArray.push(
                <li key={index} className='input-pd' value={value} onClick={() => this.selectItem(value)}>
                    {value}
                </li>
            );
            else throw new Error("Invalid Dropdown Option !!! \n Note: It should be in [{text: 'truthy', value: 'truthy'}] format.")
        }
        return optionArray;
    }

    render(){
        const {errorText, placeholder, label, isRequired, id, className, autoCompleteRef} = this.props;
        const {value, ddOptions, itemlListStyle} = this.state;
        const suggestions = this.getDdList(ddOptions);
        console.log('auto complete render');
        return (
            <div id={id} className='auto-complete' >
                {label && <div className='h-font h-2 input-label'>{label + (isRequired ? ' *' : "" )}</div>}
                <div className='auto-input-wrp'>
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
                    { suggestions.length ? 
                        <ul className='hide-list' ref={(el) => this.suggestionList = el} style={itemlListStyle}>
                        {suggestions}
                    </ul> : null}
                </div>
                {/* {errorText && <div>{errorText}</div>} */}
            </div>
        )
    }
}

export default AutoComplete;