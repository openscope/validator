const BaseValidator = require('./BaseValidator');

class AirwaysValidator extends BaseValidator {
    constructor(json) {
        super('airways', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = AirwaysValidator;
