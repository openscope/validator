const BaseValidator = require('./BaseValidator');
const IAirway = require('./types/i-airway');

/**
 *
 *
    "airways": {
        "J70": ["HQM", "ELMAA", "SEA", "NORMY", "BLUIT", "EPH", "MLP"],
        "J523": ["TOU", "ARRIE", "SEA", "WANTA", "LTJ", "IMB"]
    }
 *
 */
class AirwaysValidator extends BaseValidator {
    constructor(json) {
        super('airways', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceDict();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceDict() {
        super.validateInterfaceDict(IAirway);
    }
}

module.exports = AirwaysValidator;
