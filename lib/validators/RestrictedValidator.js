const ValidatorAbstract = require('./ValidatorAbstract');
const IRestricted = require('./types/i-restricted').IRestricted;
const IRestrictedList = require('./types/i-restricted').IRestrictedList;

/**
 *
    "restricted": [
        {
            "name": "P-51",
            "height": "2500ft",
            "coordinates": [
                ["N47.7737128", "W122.7710456"],
                ["N47.7189169", "W122.7706794"],
                ["N47.6924411", "W122.7388044"]
            ]
        }
    ]
 *
 * @class RestrictedValidator
 */
class RestrictedValidator extends ValidatorAbstract {
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
