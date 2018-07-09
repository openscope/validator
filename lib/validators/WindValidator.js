const ValidatorAbstract = require('./ValidatorAbstract');
const IWind = require('./types/i-wind');

/**
 *
    "wind": {
        "angle": 150,
        "speed": 9
    }
 *
 * @class WindValidator
 */
class WindValidator extends ValidatorAbstract {
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
