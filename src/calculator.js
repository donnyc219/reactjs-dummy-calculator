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

        this.onKeyClicked = this.onKeyClicked.bind(this);

        this.stateHelper = new StateHelper();
    }

    onKeyClicked(value){


        if (this.isReachedLimit(this.state.firstValue, this.state.secondValue, this.state.displayValue, this.state.operator, value)) {
            alert("Number is too long. I cannot handle it.");
            return ;
        }

        let res = this.stateHelper.getResult(this.state.state, value, this.state.displayValue);

        try {
            this.handleResult(res);
        } catch (e) {
            console.error("Something wrong. I think you need to implement more methods to handle different states.");
        }
    }

    isReachedLimit(firstValue, secondValue, displayValue, operator, value){

        if (isNaN(value))   return false;

        // this is the case when you just clicked an operator and going to start the second number
        // p.s. "value" is the first digit of your second number
        // in this case, no need to check
        // e.g. "17" + "4"   ("value" = "4")
        if (firstValue.toString()!=="0" && operator!==Operator.noOperator && secondValue.toString()==="0")
            return false;

        let newValue = displayValue.toString().replace(".", "").replace("-", "");
        if (newValue.length>7) return true;

        return false;
    }

    handleResult(result){
        // thousands separator: 
        // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

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
            case States.SecondNumberWithDot:
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
                
                if (displayValue==="0") result.state = States.Start;
                else if (displayValue.toString().includes("."))    result.state = States.NumberWithDot;
                else result.state = States.NumberWithNoDot;

                break;

            default:
                console.error("In handlResult. Case not found")
                break;
        }

        this.updateState(displayValue, firstValue, secondValue, operator, result.state);
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

    formatDisplayValue(strNumber){

        if (this.getLastCharOf(strNumber)===".") {
            // eg "129."
            return this.addThousandSeparator(parseFloat(strNumber)).concat(".");
        } else if (this.getLastCharOf(strNumber)==="0" && strNumber.toString().includes(".")) {
            // eg 123.10, 102.310
            // cases like 13230 are excluded
            return this.addThousandSeparator(strNumber);
        }

        let num = parseFloat(parseFloat(parseFloat(strNumber).toFixed(8)).toPrecision(8));
        return this.addThousandSeparator(num);
    }

    addThousandSeparator(x){
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    calculate(a, b, operator){
        let res = 0;
        switch (operator) {
            case Operator.addition:
                res = parseFloat(a) + parseFloat(b);
                break;
            case Operator.substraction:
                res = parseFloat(a) - parseFloat(b);
                break;
            case Operator.multiplication:
                res = parseFloat(a) * parseFloat(b);
                break;
            default:
                if (b==="0" || b<1e-10) return "Error!";
                res = parseFloat(a) / parseFloat(b);
                break;
        }

        return res;

    }

    getLastCharOf(value){
        return value.toString().charAt(value.toString().length-1);
    }


    // helper method
    printObject(tag, object){
        console.log(tag);
        console.log(object);
    }

    render() {

        let formattedDisplayResult = this.formatDisplayValue(this.state.displayValue);

        return (

            <Container className="calculator">
                <Row noGutters="true"><Col><Display value={formattedDisplayResult}/></Col></Row>
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