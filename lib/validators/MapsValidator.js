const BaseValidator = require('./BaseValidator');

class MapsValidator extends BaseValidator {
    constructor(json) {
        super('maps', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = MapsValidator;
