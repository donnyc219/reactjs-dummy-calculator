import React from 'react';
import './index.css';

class Key extends React.Component {
    
    // constructor(props) {}

    render(){
        const style = (this.props.keyValue==="0")? "key key-zero": "key";
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