const ValidatorAbstract = require('./ValidatorAbstract');
const findUndefinedFixesInProcedure = require('../findUndefinedFixes').findUndefinedFixesInProcedure;
const MessageType = require('./types/message-type').MessageType;
const IStarProcedure = require('./types/i-procedure').IStarProcedure;
const ERROR = require('./errorMessage');

/**
 *
    "stars": {
        "OLM2": {
            "icao": "OLM2",
            "name": "Olympia Two",
            "entryPoints": {
                "BTG": ["BTG", "COUGA"],
                "OLM": [],
                "UBG": ["UBG"]
            },
            "body": [],
            "rwy": {
                "KSEA16L": [["OLM", "A170+|S270"], "LACEE", ["ARVAD", "A130|S250"], "FOURT", "#343"],
                "KSEA16C": [["OLM", "A170+|S270"], "LACEE", ["ARVAD", "A130|S250"], "FOURT", "#343"],
                "KSEA16R": [["OLM", "A170+|S270"], "LACEE", ["ARVAD", "A130|S250"], "FOURT", "#343"],
                "KSEA34L": [["OLM", "A130|S250"], "LACEE", "ARVAD", "FOURT", "#070"],
                "KSEA34C": [["OLM", "A130|S250"], "LACEE", "ARVAD", "FOURT", "#070"],
                "KSEA34R": [["OLM", "A130|S250"], "LACEE", "ARVAD", "FOURT", "#070"]
            },
            "draw": [
                ["BTG*", "COUGA", "OLM*"],
                ["UBG*", "OLM"],
                ["OLM", "LACEE", "ARVAD", "FOURT"]
            ]
        }
    }
}
 *
 * @class StarsValidator
 */
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
        this.validateKeyIcaoNames();
        this.validatePatternFixes();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IStarProcedure);
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
