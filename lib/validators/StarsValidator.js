const ValidatorAbstract = require('./ValidatorAbstract');
const IStarProcedure = require('./types/i-procedure').IStarProcedure;

class StarsValidator extends ValidatorAbstract {
    constructor(json) {
        super('stars', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IStarProcedure);
    }
}

module.exports = StarsValidator;
