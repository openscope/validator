const BaseValidator = require('./BaseValidator');
const IMap = require('tcomb');

class MapsValidator extends BaseValidator {
    constructor(json) {
        super('maps', json);
    }

    validate() {
        this.validateObj();
        // FIXME: currently fails due to size of `maps.base`
        // this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(IMap);
    }
}

module.exports = MapsValidator;
