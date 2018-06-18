const BaseValidator = require('./BaseValidator');
const IFix = require('./types/i-fix');

class FixesValidator extends BaseValidator {
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
