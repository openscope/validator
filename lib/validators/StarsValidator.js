const ValidatorAbstract = require('./ValidatorAbstract');
const findUndefinedFixesInProcedure = require('../findUndefinedFixesInProcedure').findUndefinedFixesInProcedure;
const MessageType = require('./types/message-type').MessageType;
const IStarProcedure = require('./types/i-procedure').IStarProcedure;
const ERROR = require('./errorMessage');

class StarsValidator extends ValidatorAbstract {
    constructor(json, fixList) {
        super('stars', json);

        if (!fixList) {
            return;
        }

        this._fixList = Object.keys(fixList);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
        this.validatePatternFixes();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IStarProcedure);
    }

    validatePatternFixes() {
        if (this._fixList.length === 0 || !this.isValid) {
            return this;
        }

        for (let procedureIcao in this._data) {
            const undefinedFixes = findUndefinedFixesInProcedure(this._data[procedureIcao], this._fixList);

            if (undefinedFixes.length === 0) {
                continue;
            }

            const errorMessageStr = `${ERROR.PROCEDURE.UNDEFINED_FIX.BASE_MESSAGE} STAR - ${procedureIcao}: ${undefinedFixes.join(', ')}`;
            const errorMessage = new MessageType({
                message: errorMessageStr,
                level: ERROR.PROCEDURE.UNDEFINED_FIX.LEVEL
            });

            this.registerError(errorMessage);
        }
    }
}

module.exports = StarsValidator;
