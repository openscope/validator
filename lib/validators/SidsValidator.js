const BaseValidator = require('./BaseValidator');

class SidsValidator extends BaseValidator {
    constructor(json) {
        super('sids', json);
    }

    validate() {
        this.validateObj();
    }

    validateObj() {
        super.validateObj();
    }
}

module.exports = SidsValidator;
