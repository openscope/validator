const BaseValidator = require('./BaseValidator');

class MapsValidator extends BaseValidator {
    constructor(json) {
        super('maps', json);
    }

    validate() {
        this.validateObj();
    }

    validateObj() {
        super.validateObj();
    }
}

module.exports = MapsValidator;
