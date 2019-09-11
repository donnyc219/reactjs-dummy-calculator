import React from 'react';
import './index.css';
import Key from './key';
import StateHelper from './StateHelper';
import Display from './display';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import States from './States';




class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "0",
            state: States.Start
        };

        this.updateDisplayValue = this.updateDisplayValue.bind(this);
        this.onKeyClicked = this.onKeyClicked.bind(this);

        this.stateHelper = new StateHelper();
        console.log("state: " + this.stateHelper.state)
    }

    onKeyClicked(value){
 
        this.updateDisplayValue(value);
        this.printObject("state", this.state);

        let res = this.stateHelper.giveMeNewStateAndValue(this.state.state, value, this.state.value);

        try {
            this.updateState(res);
        } catch (e) {
            console.error("Something wrong. I think you need to implement more methods to handle different states.");
        }
    
    }

    updateState(result){
        this.setState({
            value: result.value,
            state: result.state
        });
    }

    updateDisplayValue(value){

        /**
         * TODO: AC, +/-, etc
         * TODO2: handle "."
         *  1. ban multiple "."
         *  2. forbid "." becoming the first digit
         * TODO3: no multiple "0" when value is already 0
         * TODO4: disallow 11 chars or more
         */
        

        let stateValue = this.state.value;

        // if the display is 0, just update stateValue. Otherwise concatenate it
        stateValue = (parseFloat(stateValue)<0.0001)? value.toString(): stateValue + value.toString();
        
        this.setState({
            value: stateValue
        });

    }
    // helper method
    printObject(tag, object){
        console.log(tag);
        console.log(object);
    }

    render() {

        return (

            <Container className="calculator">
                <Row noGutters="true"><Col><Display value={this.state.value} /></Col></Row>
                <Row noGutters="true">
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="AC"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="+/-"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="%"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="&#247;"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="7"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="8"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="9"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="&times;"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="4"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="5"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="6"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="-"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="1"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="2"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="3"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="+"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col xs={6}><Key onKeyClicked={this.onKeyClicked} keyValue="0"/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="."/></Col>
                    <Col><Key onKeyClicked={this.onKeyClicked} keyValue="="/></Col>
                </Row>

            </Container>
        );
    }
}

export default Calculator;