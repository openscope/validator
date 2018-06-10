const BaseValidator = require('./BaseValidator');

class WindValidator extends BaseValidator {
    constructor(json) {
        super('wind', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = WindValidator;
