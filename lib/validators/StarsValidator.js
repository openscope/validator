const BaseValidator = require('./BaseValidator');
const IStarProcedure = require('./types/i-procedure').IStarProcedure;

class StarsValidator extends BaseValidator {
    constructor(json) {
        super('stars', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceDict();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceDict() {
        super.validateInterfaceDict(IStarProcedure);
    }
}

module.exports = StarsValidator;
