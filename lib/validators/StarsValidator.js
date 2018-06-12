const BaseValidator = require('./BaseValidator');

class StarsValidator extends BaseValidator {
    constructor(json) {
        super('stars', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = StarsValidator;
