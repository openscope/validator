const BaseValidator = require('./BaseValidator');
const IRunway = require('./types/i-runway').IRunway;
const IRunwayList = require('./types/i-runway').IRunwayList;

class RunwaysValidator extends BaseValidator {
    constructor(json) {
        super('runways', json);
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        super.validateInterfaceList(IRunwayList, IRunway);
    }
}

module.exports = RunwaysValidator;
