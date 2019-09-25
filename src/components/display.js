import React from 'react';
import '../index.css'

class Display extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    render(){
        return(

            <div className="display" >
                <div className="display-text">{this.props.value}</div>
            </div>
        );
    }
}

export default Display;