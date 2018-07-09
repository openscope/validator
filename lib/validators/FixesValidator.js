const ValidatorAbstract = require('./ValidatorAbstract');
const LatLongType = require('./types/lat-long-type').LatLongType;

/**
 *
    "fixes": {
        "ALDER": ["N46d49.29", "W122d24.85"],
        "ALKIA": ["N47d37.26", "W122d28.45"],
        "ATOME": ["N47d36.45", "W122d21.79"]
    }
 *
 * @class FixesValidator
 */
class FixesValidator extends ValidatorAbstract {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(LatLongType);
    }
}

module.exports = FixesValidator;
