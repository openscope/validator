const ValidatorAbstract = require('./ValidatorAbstract');
const IRunway = require('./types/i-runway').IRunway;
const IRunwayList = require('./types/i-runway').IRunwayList;

/**
 *
    "runways":[
        {
            "name": ["16L", "34R"],
            "end": [
                [47.463767, -122.307749, "432.5ft"],
                [47.431201, -122.308035, "346.8ft"]
            ],
            "ils": [true, true],
            "glideslope": [3.00, 2.75]
        },
    ]
 *
 * @class RunwaysValidator
 */
class RunwaysValidator extends ValidatorAbstract {
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
