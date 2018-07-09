const _ = require('lodash');
const ValidatorAbstract = require('./ValidatorAbstract');
const findUndefinedFixesInProcedure = require('../findUndefinedFixes').findUndefinedFixesInProcedure;
const ISidProcedure = require('./types/i-procedure').ISidProcedure;
const MessageType = require('./types/message-type').MessageType;
const ERROR = require('./errorMessage');

/**
 *
    "sids": {
        "SUMMA1": {
            "icao": "SUMMA1",
            "name": "Summa One",
            "rwy": {
                "KSEA16L": ["NEVJO"],
                "KSEA16C": ["NEVJO"],
                "KSEA16R": ["NEVJO"],
                "KSEA34L": [["NEZUG", "A40+"], "^_NEZUG070PAE139", "_SUMMA326017"],
                "KSEA34C": [["NEZUG", "A40+"], "^_NEZUG070PAE139", "_SUMMA326017"],
                "KSEA34R": [["NEZUG", "A40+"], "^_NEZUG070PAE139", "_SUMMA326017"]
            },
            "body": [],
            "exitPoints": {
                "BKE": ["SUMMA", "BKE"],
                "LKV": ["SUMMA", "LKV"],
                "SUMMA": ["SUMMA"]
            },
            "draw": [
                ["NEVJO", "SUMMA"],
                ["NEZUG", "_NEZUG070PAE139", "_SUMMA326017", "SUMMA"],
                ["SUMMA", "LKV*"],
                ["SUMMA*", "BKE*"]
            ]
        }
    }
 *
 * @class SidsValidator
 */
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
        this.validateKeyIcaoNames();
        this.validatePatternFixes();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(ISidProcedure);
    }

    validateKeyIcaoNames() {
        if (!this.isValid) {
            return this;
        }

        for (let key in this._data) {
            const procedure = this._data[key];

            if (key === procedure.icao) {
                continue;
            }

            const errorMessageStr = `${ERROR.PROCEDURE.KEY_ICAO_MISMATCH.BASE_MESSAGE} - key = ${key}, icao = ${procedure.icao}`;
            const errorMessage = new MessageType({
                message: errorMessageStr,
                level: ERROR.PROCEDURE.KEY_ICAO_MISMATCH.LEVEL
            });

            this.registerError(errorMessage);
        }
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
