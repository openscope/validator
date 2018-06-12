const BaseValidator = require('./BaseValidator');

class AirwaysValidator extends BaseValidator {
    constructor(json) {
        super('airways', json);
    }

    validate() {
        this.validateObj();
    }

    validateObj() {
        super.validateObj();
    }
}

module.exports = AirwaysValidator;
