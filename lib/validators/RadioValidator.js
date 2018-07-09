const ValidatorAbstract = require('./ValidatorAbstract');
const IRadio = require('./types/i-radio');

/**
 *
    "radio": {
        "twr": "Seatle Tower",
        "app": "Seattle Approach",
        "dep": "Seattle Departure"
    }
 *
 * @class RadioValidator
 */
class RadioValidator extends ValidatorAbstract {
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
