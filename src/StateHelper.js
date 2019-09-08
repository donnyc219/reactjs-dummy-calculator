import Cases from './Cases';

class StateHelper {
    
    constructor(){
        this.state = Cases.ZERO;
        this.value = "0"
    }

    giveMeNewStateAndValue(state, value){
        console.log("hey mana");
    }

}

export default StateHelper;