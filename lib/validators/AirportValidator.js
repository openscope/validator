const BaseValidator = require('./BaseValidator');

class AirportValidator extends BaseValidator {
    constructor(json) {
        super('airport', json);
    }

    validate() {
        this.validateSingle();
    }

    validateSingle() {
        super.validateSingle(this._data);
    }
}

module.exports = AirportValidator;
