import React from 'react';
import './index.css';
import States from './States';
import StateHelper from './StateHelper';

class Key extends React.Component {
    
    // constructor(props) {}

    render(){
        let style;
        if (this.props.keyValue==="0")  style = "key key-zero";
        else if (this.props.keyValue==="+"
            || this.props.keyValue==="-"
            || this.props.keyValue==="="
            || this.props.keyValue==="\u00f7"
            || this.props.keyValue==="\u00d7")  style = "key special-key";
        else style = "key";

        return(
            <button 
                value={this.props.keyValue} 
                className={style} 
                onClick={ () => this.props.onKeyClicked(this.props.keyValue)}>
                {this.props.keyValue}
            </button>
        );
    }
}

export default Key;