import React from 'react';
import './index.css';
import Key from './key';
import StateHelper from './StateHelper';
import Display from './display';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import States from './States';
import Operator from './Operator';

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            firstValue: 0,
            secondValue: 0,
            state: States.Start,
            operator: Operator.noOperator
        };

        this.updateDisplayValue = this.updateDisplayValue.bind(this);
        this.onKeyClicked = this.onKeyClicked.bind(this);

        this.stateHelper = new StateHelper();
    }

    onKeyClicked(value){
 
        // this.updateDisplayValue(value);
        // this.printObject("state", this.state);
        
        let res = this.stateHelper.getResult(this.state.state, value, this.state.displayValue);

        try {
            this.handleResult(res);
        } catch (e) {
            console.error("Something wrong. I think you need to implement more methods to handle different states.");
        }
    
    }

    handleResult(result){
        let displayValue, operator;
        let firstValue = this.state.firstValue;
        let secondValue = 0;

        this.printObject("Result", result);

        switch (result.state) {
            case States.Start:
                displayValue = 0;
                firstValue = 0;
                operator = result.operator;
                break;
            case States.NumberEndingWithDot:
            case States.NumberWithNoDot:
            case States.NumberWithOperator:
            case States.NumberWithDot:
                displayValue = result.value;
                firstValue = result.value;

                // operator no change   => use operator in this.state
                // operator need change => use new operator
                operator = (result.operator===Operator.operatorNoChange)? this.state.operator: result.operator;
                break;
            case States.SecondNumberWithNoDotWithOperator:
                displayValue = result.value;
                secondValue = result.value;
                operator = (result.operator===Operator.operatorNoChange)? this.state.operator: result.operator;
                break;
            case States.SecondNumberIsZeroWithOperator:
                displayValue = 0;
                secondValue = 0;
                operator = (result.operator===Operator.operatorNoChange)? this.state.operator: result.operator;
                break;
            case States.SecondNumberEndingWithDot:
                displayValue = result.value;
                secondValue = result.value;
                operator = (result.operator===Operator.operatorNoChange)? this.state.operator: result.operator;
                break;
            case States.ReturnResultWithOperator:
                displayValue = this.calculate(this.state.firstValue, this.state.secondValue, this.state.operator);
                firstValue = displayValue;
                secondValue = 0;
                operator = (result.operator===Operator.operatorNoChange)? this.state.operator: result.operator;
                result.state = States.NumberWithOperator;   // change the state manually so that it can be updated below
                break;
            case States.ReturnResultNoOperator:
                displayValue = this.calculate(this.state.firstValue, this.state.secondValue, this.state.operator);
                firstValue = displayValue;
                secondValue = 0;
                operator = Operator.noOperator;
                break;

            default:
                console.error("In handlResult. Case not found")
                break;
        }

        this.updateState(displayValue, firstValue, secondValue, operator, result.state);
        // this.printObject("updated state", this.state);
    }

    updateState(displayValue, firstValue, secondValue, operator, state){
        this.setState({
            displayValue: displayValue,
            firstValue: firstValue,
            secondValue: secondValue,
            operator: operator,
            state: state
        }, () => {
            this.printObject("updated state", this.state);
        });
    }

    calculate(a, b, operator){
        switch (operator) {
            case Operator.addition:
                return parseFloat(a) + parseFloat(b);
            case Operator.substraction:
                return parseFloat(a) - parseFloat(b);
            case Operator.multiplication:
                return parseFloat(a) * parseFloat(b);
            default:
                if (b==="0" || b<0.0001) return "Error!";
                return parseFloat(a) / parseFloat(b);
        }
    }

    // display value is updated when this.state is updated.
    // this method is not useful at all now
    updateDisplayValue(value){

        /**
         * TODO: AC, +/-, etc
         * TODO2: handle "."
         *  1. ban multiple "."
         *  2. forbid "." becoming the first digit
         * TODO3: no multiple "0" when value is already 0
         * TODO4: disallow 11 chars or more
         */
        

        // let stateValue = this.state.displayValue;

        // // if the display is 0, just update stateValue. Otherwise concatenate it
        // stateValue = (parseFloat(stateValue)<0.0001)? value.toString(): stateValue + value.toString();
        
        // this.setState({
        //     value: stateValue
        // });



    }
    // helper method
    printObject(tag, object){
        console.log(tag);
        console.log(object);
    }

    render() {

        return (

            <Container className="calculator">
                <Row noGutters="true"><Col><Display value={this.state.displayValue} /></Col></Row>
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