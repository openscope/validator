const ValidatorAbstract = require('./ValidatorAbstract');
const findUndefinedFixesInAirway = require('../findUndefinedFixesInProcedure').findUndefinedFixesInAirway;
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
class AirwaysValidator extends ValidatorAbstract {
    constructor(json, fixList) {
        super('airways', json);

        if (!fixList) {
            return;
        }

        this._fixList = Object.keys(fixList);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
        this.validateAirwayFixes();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IAirway);
    }

    validateAirwayFixes() {
        if (this._fixList.length === 0 || !this.isValid) {
            return this;
        }

        for (let procedureIcao in this._data) {
            const undefinedFixes = findUndefinedFixesInAirway(this._data[procedureIcao], this._fixList);

            if (undefinedFixes.length === 0) {
                continue;
            }

            const errorMessageStr = `${ERROR.PROCEDURE.UNDEFINED_FIX.BASE_MESSAGE} SID - ${procedureIcao}: ${undefinedFixes.join(', ')}`;
            const errorMessage = new MessageType({
                message: errorMessageStr,
                level: ERROR.PROCEDURE.UNDEFINED_FIX.LEVEL
            });

            this.registerError(errorMessage);
        }
    }
}

module.exports = AirwaysValidator;
