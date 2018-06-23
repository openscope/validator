const ValidatorAbstract = require('./ValidatorAbstract');

class AirportValidator extends ValidatorAbstract {
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
