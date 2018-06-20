const BaseValidator = require('./BaseValidator');
// const MessageType = require('./types/message-type');
const SpawnPatternCategoryEnum = require('./types/i-spawn-pattern').SpawnPatternCategoryEnum;
const ISpawnPattern = require('./types/i-spawn-pattern').ISpawnPattern;
const ISpawnPatternList = require('./types/i-spawn-pattern').ISpawnPatternList;
// const ERROR = require('./errorMessage');

class SpawnPatternsValidator extends BaseValidator {

    get arrivalSpawnPatterns() {
        return this._data.filter((item) => item.category === SpawnPatternCategoryEnum.meta.map.arrival);
    }

    get departureSpawnPatterns() {
        return this._data.filter((item) => item.category === SpawnPatternCategoryEnum.meta.map.departure);
    }

    get departureSpawnPatternRoutes() {
        return this.departureSpawnPatterns.map((item) => item.route);
    }

    /**
     *
     * @param {object} json
     */
    constructor(json = {}) {
        super('spawnPatterns', json.spawnPatterns);

        this._sids = json.sids;
        this._stars = json.stars;
    }

    validate() {
        this.validateList();
        this.validateInterfaceList();
        this.validateSpawnPatternRoutes();
    }

    validateList() {
        super.validateList();
    }

    validateInterfaceList() {
        super.validateInterfaceList(ISpawnPatternList, ISpawnPattern);
    }

    validateSpawnPatternRoutes() {
        this._validateDepartureSpawnPatternRoutes();
        this._validateArrivalSpawnPatternRoutes();
    }

    _validateDepartureSpawnPatternRoutes() {
        const sidKeys = Object.keys(this._sids);

        // console.log('\n', this.departureSpawnPatternRoutes);
        // console.log('\n', sidKeys);
    }

    _validateArrivalSpawnPatternRoutes() {}
}

module.exports = SpawnPatternsValidator;
