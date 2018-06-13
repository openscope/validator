const BaseValidator = require('./BaseValidator');
const IRestricted = require('./types/i-restricted').IRestricted;
const IRestrictedList = require('./types/i-restricted').IRestrictedList;

class RestrictedValidator extends BaseValidator {
    constructor(json) {
        super('restricted', json);
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        super.validateInterfaceList(IRestrictedList, IRestricted);
    }
}

module.exports = RestrictedValidator;
