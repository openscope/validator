const ValidatorAbstract = require('./ValidatorAbstract');
const ISidProcedure = require('./types/i-procedure').ISidProcedure;

class SidsValidator extends ValidatorAbstract {
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
