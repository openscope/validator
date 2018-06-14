const BaseValidator = require('./BaseValidator');
const IFix = require('./types/i-fix');

class FixesValidator extends BaseValidator {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceDict();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceDict() {
        super.validateInterfaceDict(IFix);
    }
}

module.exports = FixesValidator;
