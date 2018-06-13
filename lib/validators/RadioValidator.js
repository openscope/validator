const BaseValidator = require('./BaseValidator');
const IRadio = require('./types/i-radio');

class RadioValidator extends BaseValidator {
    constructor(json) {
        super('radio', json);
    }

    validate() {
        this.validateSingle();
        this.validateInterface();
    }

    validateSingle() {
        super.validateSingle(this._data);
    }

    validateInterface() {
        super.validateInterface(IRadio);
    }
}

module.exports = RadioValidator;
