const BaseValidator = require('./BaseValidator');

class RestrictedValidator extends BaseValidator {
    constructor(json) {
        super('restricted', json);
    }

    validate() {
        this.validateList();
    }

    validateList() {
        super.validateList();
    }
}

module.exports = RestrictedValidator;
