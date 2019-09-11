import Cases from './Cases';
import States from './States';
import Result from './Result';


class StateHelper {
    
    constructor(){
        this.state = Cases.ZERO;
        this.value = "0"
    }

    // give me state and value, I return you an object of Result
    giveMeNewStateAndValue(state, key, value){

        switch (state) {
            case States.Start:
                return this.startState(state, key, value);
            default:
                console.log("what is that?");
                break;
        }
    }

    startState(state, key, value){

        let newState, newValue;
        if (key===".") {
            newState = States.NumberEndingWithDot;
            newValue = "0.";
        } else if (key>="1" && key<="9") {
            newState = States.NumberWithNoDot;
            newValue = key;
        } else {
            newState = States.startState;
            newValue = "0";
        }

        return new Result(newState, newValue);
    }



}

export default StateHelper;