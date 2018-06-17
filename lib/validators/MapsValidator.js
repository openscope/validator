const BaseValidator = require('./BaseValidator');
const IMap = require('tcomb');

class MapsValidator extends BaseValidator {
    constructor(json) {
        super('maps', json);
    }

    validate() {
        this.validateObj();
        // FIXME: currently fails due to size of `maps.base`
        // this.validateInterfaceDict();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceDict() {
        super.validateInterfaceDict(IMap);
    }
}

module.exports = MapsValidator;
