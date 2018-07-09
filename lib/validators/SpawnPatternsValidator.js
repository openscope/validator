const ValidatorAbstract = require('./ValidatorAbstract');
const ISpawnPattern = require('./types/i-spawn-pattern').ISpawnPattern;
const ISpawnPatternList = require('./types/i-spawn-pattern').ISpawnPatternList;

/**
 *
    "spawnPatterns": [
        {
            "origin": "ksea",
            "destination": "",
            "category": "departure",
            "route": "KSEA16L.SUMMA1.LKV",
            "altitude": "",
            "speed": "",
            "method": "random",
            "rate": 9,
            "airlines": [
                ["aal", 4.05],
                ["aca", 0.95],
                ["asa", 32.09],
            ]
        },
        {
            "origin": "",
            "destination": "ksea",
            "category": "arrival",
            "route": "PDT.CHINS3.KSEA16R",
            "altitude": [18000, 36000],
            "speed": 320,
            "method": "random",
            "rate": 15,
            "airlines": [
                ["aal", 4.05],
                ["aca", 0.95],
                ["asa", 32.09],
            ]
        }
    ]
 *
 * @class SpawnPatternsValidator
 */
class SpawnPatternsValidator extends ValidatorAbstract {
    constructor(json, airlinesJson) {
        super('spawnPatterns', json);

        this._airlines = airlinesJson;
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
        this.validateAirlineFLeets();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        super.validateInterfaceList(ISpawnPatternList, ISpawnPattern);
    }

    validateAirlineFLeets() {
        console.log('+++');
    }
}

module.exports = SpawnPatternsValidator;
