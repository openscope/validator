const BaseValidator = require('./BaseValidator');
const IWind = require('./types/i-wind');

class WindValidator extends BaseValidator {
    constructor(json) {
        super('wind', json);
    }

    validate() {
        this.validateSingle();
        this.validateInterface();
    }

    validateSingle() {
        super.validateSingle(this._data);
    }

    validateInterface() {
        super.validateInterface(IWind);
    }
}

module.exports = WindValidator;
