const ValidatorAbstract = require('./ValidatorAbstract');
const IMap = require('tcomb');

/**
 *
    "maps": {
        "base": [
            ["N47.46706920", "W122.43465440", "N47.46816390", "W122.43651330"],
            ["N47.46635080", "W122.43369000", "N47.46706920", "W122.43465440"],
            ["N47.46975860", "W122.43977560", "N47.47109720", "W122.44296940"]
        }
    }
 *
 * @class MapsValidator
 */
class MapsValidator extends ValidatorAbstract {
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
