const _ = require('lodash');
const ValidatorAbstract = require('./ValidatorAbstract');
const findUndefinedFixesInProcedure = require('../findUndefinedFixesInProcedure').findUndefinedFixesInProcedure;
const ISidProcedure = require('./types/i-procedure').ISidProcedure;
const MessageType = require('./types/message-type').MessageType;
// const PROCEDURE = require('../constants/procedure');
const ERROR = require('./errorMessage');

class SidsValidator extends ValidatorAbstract {
    constructor(json, fixList) {
        super('sids', json);

        if (!fixList) {
            return;
        }

        this._fixList = Object.keys(fixList);
    }

    registerError(errorMessage) {
        super.registerError(errorMessage);
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
        super.validateInterfaceObj(ISidProcedure);
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

            const errorMessageStr = `${ERROR.PROCEDURE.UNDEFINED_FIX.BASE_MESSAGE} SID - ${procedureIcao}: ${undefinedFixes.join(', ')}`;
            const errorMessage = new MessageType({
                message: errorMessageStr,
                level: ERROR.PROCEDURE.UNDEFINED_FIX.LEVEL
            });

            this.registerError(errorMessage);
        }
    }
}

module.exports = SidsValidator;
