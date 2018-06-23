const ValidatorAbstract = require('./ValidatorAbstract');
const IFix = require('./types/i-fix');

class FixesValidator extends ValidatorAbstract {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IFix);
    }
}

module.exports = FixesValidator;
