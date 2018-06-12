const BaseValidator = require('./BaseValidator');

class SidsValidator extends BaseValidator {
    constructor(json) {
        super('sids', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = SidsValidator;
