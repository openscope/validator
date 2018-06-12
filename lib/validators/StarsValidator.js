const BaseValidator = require('./BaseValidator');

class StarsValidator extends BaseValidator {
    constructor(json) {
        super('stars', json);
    }

    validate() {
        this.validateObj();
    }

    validateObj() {
        super.validateObj();
    }
}

module.exports = StarsValidator;
