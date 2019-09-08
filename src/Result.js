import Cases from './Cases';

class Result {
    constructor(){
        this.state = Cases.ZERO;
        this.value = "0";
    }

    constructor(state, value){
        this.state = state;
        this.value = value;
    }
}

export default Result;