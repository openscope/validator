const BaseValidator = require('./BaseValidator');

class AirspaceValidator extends BaseValidator {
    constructor(json) {
        super('airspace', json);
    }

    validate() {
        this.validateList();
    }

    validateList() {
        super.validateList();
    }
}

module.exports = AirspaceValidator;
