const BaseValidator = require('./BaseValidator');

class AirspaceValidator extends BaseValidator {
    constructor(json) {
        super('airspace', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = AirspaceValidator;
