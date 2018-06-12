const BaseValidator = require('./BaseValidator');

class WindValidator extends BaseValidator {
    constructor(json) {
        super('wind', json);
    }

    validate() {
        this.validateSingle();
    }

    validateSingle() {
        super.validateSingle(this._data);
    }
}

module.exports = WindValidator;
