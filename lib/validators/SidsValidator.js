const BaseValidator = require('./BaseValidator');
const ISidProcedure = require('./types/i-procedure').ISidProcedure;

class SidsValidator extends BaseValidator {
    constructor(json) {
        super('sids', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(ISidProcedure);
    }
}

module.exports = SidsValidator;
