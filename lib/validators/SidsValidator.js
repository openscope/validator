const BaseValidator = require('./BaseValidator');
const ISidProcedure = require('./types/i-procedure').ISidProcedure;

class SidsValidator extends BaseValidator {
    constructor(json) {
        super('sids', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceDict();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceDict() {
        super.validateInterfaceDict(ISidProcedure);
    }
}

module.exports = SidsValidator;
