const BaseValidator = require('./BaseValidator');

class SpawnPatternsValidator extends BaseValidator {
    constructor(json) {
        super('spawnPatterns', json);
    }

    validate() {
        super.validate();
    }
}

module.exports = SpawnPatternsValidator;
