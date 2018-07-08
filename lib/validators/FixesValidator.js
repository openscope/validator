const ValidatorAbstract = require('./ValidatorAbstract');
const LatLongType = require('./types/lat-long-type').LatLongType;

class FixesValidator extends ValidatorAbstract {
    constructor(json) {
        super('fixes', json);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(LatLongType);
    }
}

module.exports = FixesValidator;
