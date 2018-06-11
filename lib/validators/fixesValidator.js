const BaseValidator = require('./BaseValidator');

class FixesValidator extends BaseValidator {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = FixesValidator;
