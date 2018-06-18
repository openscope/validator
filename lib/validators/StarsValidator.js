const BaseValidator = require('./BaseValidator');
const IStarProcedure = require('./types/i-procedure').IStarProcedure;

class StarsValidator extends BaseValidator {
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
