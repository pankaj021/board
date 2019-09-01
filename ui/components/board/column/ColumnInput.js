import React, { Component } from 'react';
import {TextArea, DropDown, Button} from '../../../pattern-library';
import "./Column.css";

class ColumnInput extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div className='column-input'>
                <div>
                    <div className='addedBy'>
                        <select>
                            <option value="001">Test User</option>
                            <option value="001">S Suvendirian</option>
                            <option value="001">Testing</option>
                            <option value="001">Thiru</option>
                        </select>
                    </div>
                    <TextArea placeholder='Type your content here...' label='Content' />
                </div>
            </div>
        )
    }
}

export default ColumnInput;
