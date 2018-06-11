const BaseValidator = require('./BaseValidator');

class RestrictedValidator extends BaseValidator {
    constructor(json) {
        super('restricted', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = RestrictedValidator;
