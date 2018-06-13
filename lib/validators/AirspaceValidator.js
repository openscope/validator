const BaseValidator = require('./BaseValidator');
const IAirspace = require('./types/i-airspace.js').IAirspace;
const IAirspaceList = require('./types/i-airspace.js').IAirspaceList;

class AirspaceValidator extends BaseValidator {
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
