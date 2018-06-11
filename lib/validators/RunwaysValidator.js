const BaseValidator = require('./BaseValidator');

class RunwaysValidator extends BaseValidator {
    constructor(json) {
        super('runways', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = RunwaysValidator;
