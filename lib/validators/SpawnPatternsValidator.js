const BaseValidator = require('./BaseValidator');

class SpawnPatternsValidator extends BaseValidator {
    constructor(json) {
        super('spawnPatterns', json);
    }

    validate() {
        this.validateList();
    }

    validateList() {
        super.validateList();
    }
}

module.exports = SpawnPatternsValidator;
