import Cases from './Cases';
import States from './States';
import Result from './Result';
import Operator from './Operator';


// TODO: move it to somewhere else. A new class?
const symbol = {
    magnitude: "+/-",
    division: "\u00f7",
    multiplication: "\u00d7",
    percent: "%"
}

class StateHelper {

    constructor(){
        this.state = Cases.ZERO;
        this.value = "0"
    }

    // give me state and value, I return you an object of Result
    getResult(state, key, value){

        if (key==="AC")  return this.acIsClicked();
        
        switch (state) {
            case States.Start:
                return this.startState(key);
            case States.NumberEndingWithDot:
                return this.numberEndingWithADot(key, value);
            case States.NumberWithNoDot:
                return this.numberWithNoDot(key, value);
            case States.NumberWithDot:
                return this.numberWithADot(key, value);
            case States.NumberWithOperator:
                return this.numberWithOperator(key, value);
            case States.SecondNumberIsZeroWithOperator:
                return this.secondNumberIsZero(key);
            case States.SecondNumberWithNoDotWithOperator:
                return this.secondNumberWithNoDot(key, value);
            case States.SecondNumberEndingWithDot:
                return this.secondNumberEndingWithDot(key, value);
            case States.SecondNumberWithDot:
                return this.secondNumberWithDot(key, value);
            default:
                console.error("I can't determine the state");
                break;
        }
    }

    startState(key){

        let newState, newValue;
        if (key===".") {
            newState = States.NumberEndingWithDot;
            newValue = "0.";
        } else if (key>="1" && key<="9") {
            newState = States.NumberWithNoDot;
            newValue = key;
        } else {
            newState = States.Start;
            newValue = "0";
        }

        return new Result(newState, newValue, Operator.noOperator);
    }

    numberEndingWithADot(key, value){
        let newState, newValue, newOperator;

        switch (key) {
            case ".":
            case "=":
            case symbol.percent:
                newState = States.NumberEndingWithDot;
                newValue = value;
                newOperator = Operator.noOperator;
                break;
            case symbol.magnitude:
                newState = States.NumberEndingWithDot;
                newOperator = Operator.noOperator;
                newValue = this.changeMagnitude(value);
                break;
            default:    // 0-9 or operator
                if (this.isOperator(key)) {
                    newState = States.NumberWithOperator;
                    newValue = this.removeLastChar(value);
                    newOperator = this.getOperatorByKey(key);

                } else {
                    newState = States.NumberWithDot;
                    newOperator = Operator.noOperator;
                    newValue = (value + key);
                }

                break;
        }

        return new Result(newState, newValue, newOperator);

    }

    numberWithNoDot(key, value){
        let newState, newValue, newOperator;

        if (key===symbol.percent) {
            newState = States.NumberWithDot;
            newValue = value / 100;
            newOperator = Operator.noOperator;
        } else if (this.isOperator(key)) {
            newState = States.NumberWithOperator;
            newValue = value;
            newOperator = this.getOperatorByKey(key);
        } else if (key===".") {
            newState = States.NumberEndingWithDot;
            newValue = value.concat(".");
            newOperator = Operator.noOperator;
        } else { // 0-9, =, +-
            newState = States.NumberWithNoDot;
            newOperator = Operator.noOperator;
            
            if (key===symbol.magnitude){
                newValue = this.changeMagnitude(value);
            } else if (key==="=") {
                newValue = value;
            } else { // 0-9
                newValue = value.concat(key);
            }
        }

        return new Result(newState, newValue, newOperator);
    }

    numberWithADot(key, value){
        let newState, newValue, newOperator;

        if (this.isOperator(key)) {
            newState = States.NumberWithOperator;
            newValue = value;
            newOperator = this.getOperatorByKey(key);
        } else {    // 0-9, ., =, +-, %
            newState = States.NumberWithDot;
            newOperator = Operator.noOperator;

            if (key===symbol.percent) {
                newValue = value/100;
            } else if (key==="=" || key===".") {
                newValue = value;
            } else if (key===symbol.magnitude) {
                newValue = this.changeMagnitude(value);
            } else { // 0-9
                newValue = value.toString().concat(key);
            }
        }
        
        return new Result(newState, newValue, newOperator);
    }

    numberWithOperator(key, value){
        let newState, newValue, newOperator;

        if (key==="0") {
            newState = States.SecondNumberIsZeroWithOperator;
            newValue = 0;
            newOperator = Operator.operatorNoChange;
        } else if (key>="1" && key<="9") {
            newState = States.SecondNumberWithNoDotWithOperator;
            newValue = key;
            newOperator = Operator.operatorNoChange;
        } else if (key==="."){
            newState = States.SecondNumberEndingWithDot;
            newValue = "0.";
            newOperator = Operator.operatorNoChange;
        } else {
            newState = States.NumberWithOperator;
            newOperator = Operator.operatorNoChange;
            
            if (this.isOperator(key)) {
                newValue = value;
                newOperator = this.getOperatorByKey(key);
            } else if (key==="=") {
                newValue = value;
            } else if (key===symbol.magnitude) {
                newValue = this.changeMagnitude(value);
            } else { // %
                newValue = value/100;
            }

        }

        return new Result(newState, newValue, newOperator);
    }

    secondNumberIsZero(key){
        // assume there is no such a thing called "-0". So only 0.
        let newState, newValue, newOperator;

        switch (key) {
            case "0":
            case symbol.percent:
                newState = States.SecondNumberIsZeroWithOperator;
                newValue = 0;
                newOperator = Operator.operatorNoChange;
                break;
            case symbol.magnitude:
                newState = States.SecondNumberIsZeroWithOperator;
                newValue = 0;
                newOperator = Operator.operatorNoChange;
                break;
            case ".":
                newState = States.SecondNumberEndingWithDot;
                newValue = "0.";
                newOperator = Operator.operatorNoChange;
                break;
            case "=":
                newState = States.ReturnResultNoOperator;
                newValue = 0;
                newOperator = Operator.noOperator;
                break;
            default:    // operator or 1-9
                if (this.isOperator(key)) { // operator
                    newState = States.ReturnResultWithOperator;
                    newValue = 0;
                    newOperator = this.getOperatorByKey(key);
                } else {    // 1-9
                    newState = States.SecondNumberWithNoDotWithOperator;
                    newValue = key;
                    newOperator = Operator.operatorNoChange;
                }
                break;

        }

        return new Result(newState, newValue, newOperator);
    }

    secondNumberWithNoDot(key, value){
        let newState, newValue, newOperator;

        switch (key) {
            case ".":
                newState = States.SecondNumberEndingWithDot;
                newValue = value.concat(".");
                newOperator = Operator.operatorNoChange;
                break;
            case "=":
                newState = States.ReturnResultNoOperator;
                newValue = value;
                newOperator = Operator.noOperator;
                break;
            case symbol.percent:
                newState = States.SecondNumberWithDot;
                newValue = value/100;
                newOperator = Operator.operatorNoChange;
                break;
            case symbol.magnitude:
                newState = States.SecondNumberWithNoDotWithOperator;
                newValue = this.changeMagnitude(value);
                newOperator = Operator.operatorNoChange;
                break;
            default:    // eiher operator or 0-9
                if (this.isOperator(key)) {
                    newState = States.ReturnResultWithOperator;
                    newValue = value;
                    newOperator = this.getOperatorByKey(key);
                } else {    // 0-9
                    newState = States.SecondNumberWithNoDotWithOperator;
                    newValue = value.concat(key);
                    newOperator = Operator.operatorNoChange;
                }
                break;
        }

        return new Result(newState, newValue, newOperator);
    }

    secondNumberEndingWithDot(key, value){
        let newState, newValue, newOperator;

        if (key>="0" && key<="9") {
            newState = States.SecondNumberWithDot;
            newValue = value.concat(key);
            newOperator = Operator.operatorNoChange;
        } else if (key==="=") {
            newState = States.ReturnResultNoOperator;
            newValue = value;
            newOperator = Operator.noOperator;
        } else if (this.isOperator(key)) {
            newState = States.ReturnResultWithOperator;
            newValue = value;
            newOperator = this.getOperatorByKey(key);
        } else {    // one of the ., +- or %
            newState = States.SecondNumberEndingWithDot;
            newOperator = Operator.operatorNoChange;

            if (key===symbol.magnitude)    newValue = this.changeMagnitude(value);
            else newValue = value;  // either . or %. If it is a %, don't even bother to change the value
 
        }

        return new Result(newState, newValue, newOperator);
    }

    secondNumberWithDot(key, value){
        let newState, newValue, newOperator;

        if (this.isOperator(key)) {
            newState = States.ReturnResultWithOperator;
            newValue = value;
            newOperator = this.getOperatorByKey(key);
        } else if (key==="=") {
            newState = States.ReturnResultNoOperator;
            newValue = value;
            newOperator = States.operatorNoChange;
        } else {    // 0-9, ., +-, %
            newState = States.SecondNumberWithDot;
            newOperator = Operator.operatorNoChange;

            if (key===".")                      newValue = value;
            else if (key===symbol.magnitude)    newValue = this.changeMagnitude(value);
            else if (key===symbol.percent)      newValue = value/100;
            else                                newValue = value.concat(key);   // 0-9
        }

        return new Result(newState, newValue, newOperator);
    }


    acIsClicked(){
        return new Result(
            States.Start, 
            "0", 
            Operator.noOperator
        );
    }

    // It doesn't care if it is a valid number (e.g "89."). This method just add or remove a negative sign at the beginning
    changeMagnitude(strValue){
        let firstChar = strValue.toString().charAt(0);
        console.log(`firstChar: ${firstChar}`);
        if (firstChar==="-") {
            try {
                return this.removeFirstChar(strValue);
            } catch (e) {
                console.error("Something wrong in the method removeFirstChar()")
            }
        }
        return "-" + strValue;
    }

    getOperatorByKey(key){
        switch (key) {
            case "+":
                return Operator.addition;
            case "-":
                return Operator.substraction;
            case symbol.multiplication:
                return Operator.multiplication;
            default:
                return Operator.division;
        }
    }

    removeFirstChar(str) {
        return str.toString().slice(1);
    }

    removeLastChar(str){
        return str.toString().slice(0, -1);
    }

    isOperator(key){
        switch (key) {
            case "+":
            case "-":
            case symbol.multiplication:
            case symbol.division:
                return true;
            default:
                return false;
        }
    }



}

export default StateHelper;