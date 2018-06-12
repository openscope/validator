const BaseValidator = require('./BaseValidator');

class FixesValidator extends BaseValidator {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        this.validateObj();
    }

    validateObj() {
        super.validateObj();
    }
}

module.exports = FixesValidator;
