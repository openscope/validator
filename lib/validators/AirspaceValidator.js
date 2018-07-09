const ValidatorAbstract = require('./ValidatorAbstract');
const IAirspace = require('./types/i-airspace.js').IAirspace;
const IAirspaceList = require('./types/i-airspace.js').IAirspaceList;

/**
 *
    "airspace": {
        "floor": 0,
        "ceiling": 150,
        "airspace_class": "B",
        "poly": [
            ["N47.83333330", "W121.69999940"],
            ["N47.95335007", "W121.97603665"],
            ["N48.30000000", "W121.96666670"],
            ["N48.30000000", "W122.30000000"]
        ]
    }
 *
 * @class AirspaceValidator
 */
class AirspaceValidator extends ValidatorAbstract {
    constructor(json) {
        super('airspace', json);
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        for (let i = 0; i < this._data.length; i++) {
            super.validateInterfaceList(IAirspaceList, IAirspace);
        }
    }
}

module.exports = AirspaceValidator;
