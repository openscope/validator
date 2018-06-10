const BaseValidator = require('./BaseValidator');

class AirportValidator extends BaseValidator {
    constructor(json) {
        super('airport', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = AirportValidator;
