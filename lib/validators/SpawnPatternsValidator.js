const ValidatorAbstract = require('./ValidatorAbstract');
const ISpawnPattern = require('./types/i-spawn-pattern').ISpawnPattern;
const ISpawnPatternList = require('./types/i-spawn-pattern').ISpawnPatternList;

class SpawnPatternsValidator extends ValidatorAbstract {
    constructor(json) {
        super('spawnPatterns', json);
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        super.validateInterfaceList(ISpawnPatternList, ISpawnPattern);
    }
}

module.exports = SpawnPatternsValidator;
