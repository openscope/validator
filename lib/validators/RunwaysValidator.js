const BaseValidator = require('./BaseValidator');

class RunwaysValidator extends BaseValidator {
    constructor(json) {
        super('runways', json);
    }

    validate() {
        this.validateList();
    }

    validateList() {
        super.validateList();
    }
}

module.exports = RunwaysValidator;
