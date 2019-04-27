import React from 'react';
import './index.css';
import Key from './key';
import Display from './display';

class Calculator extends React.Component {

    render() {

        return (
            <div className="calculator">
                <div className="row"><Display /></div>
                <div className="row"><Key keyValue="AC"/><Key keyValue="+/-"/><Key keyValue="%"/><Key keyValue="&#247;"/></div>
                <div className="row"><Key keyValue="7"/><Key keyValue="8"/><Key keyValue="9"/><Key keyValue="&times;"/><br/></div>
                <div className="row"><Key keyValue="4"/><Key keyValue="5"/><Key keyValue="6"/><Key keyValue="-"/></div>
                <div className="row"><Key keyValue="1"/><Key keyValue="2"/><Key keyValue="3"/><Key keyValue="+"/></div>
                <div className="row"><Key keyValue="0"/><Key keyValue="."/><Key keyValue="="/></div>
            </div>
        );
    }
}

export default Calculator;