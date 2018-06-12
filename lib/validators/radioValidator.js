const BaseValidator = require('./BaseValidator');

class RadioValidator extends BaseValidator {
    constructor(json) {
        super('radio', json);
    }

    validate() {
        this.validateSingle();
    }

    validateSingle() {
        super.validateSingle(this._data);
    }
}

module.exports = RadioValidator;
