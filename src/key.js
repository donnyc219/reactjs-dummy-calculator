import React from 'react';
import './index.css';

class Key extends React.Component {

    render(){
        const style = (this.props.keyValue==="0")? "key key-zero": "key";
        return(
            <button className={style}>{this.props.keyValue}</button>
        );
    }
}

export default Key;