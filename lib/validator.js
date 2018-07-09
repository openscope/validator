const chalk = require('chalk');
const Notifier = require('./Notifier');
const AirportValidator = require('./validators/AirportValidator');
const AirspaceValidator = require('./validators/AirspaceValidator');
const AirwaysValidator = require('./validators/AirwaysValidator');
const FixesValidator = require('./validators/FixesValidator');
const MapsValidator = require('./validators/MapsValidator');
const RadioValidator = require('./validators/RadioValidator');
const RestrictedValidator = require('./validators/RestrictedValidator');
const RunwaysValidator = require('./validators/RunwaysValidator');
const SidsValidator = require('./validators/SidsValidator');
const StarsValidator = require('./validators/StarsValidator');
const SpawnPatternsValidator = require('./validators/SpawnPatternsValidator');
const WindValidator = require('./validators/WindValidator');
const MessageLevelEnum = require('./validators/types/message-type').MessageLevelEnum;

/**
 * Write validation findings to the the terminal
 *
 * @param {boolean[]} isValid
 * @param {MessageListType} errorList
 */
function _renderResults(errorList) {
    const isValid = errorList.length === 0;
    console.log('\n');

    if (isValid) {
        console.log(chalk.green('SUCCESS! Everything checks out!!\n\n'));

        return;
    }

    errorList.forEach((error) => {
        switch (error.level) {
            case MessageLevelEnum.meta.map.ERROR:
                console.log(chalk.red(error.message));

                break;
            case MessageLevelEnum.meta.map.WARNING:
                console.log(chalk.yellow(error.message));

                break;
            default:
                break;
        }
    });
}

/**
 * single public method called after an `airport` file is successfully loaded
 *
 * will instantiate each validator and pass the appropriate data parts from the airport definition
 *
 * @public
 * @function validator
 * @param {CliOptionsType} options
 * @param {object} airportJson
 * @param {object} airlinesJson
 */
function validator(options, airportJson, airlinesJson) {
    let errorList = [];
    const validatorList = [
        new AirportValidator(airportJson),
        new AirspaceValidator(airportJson.airspace),
        new AirwaysValidator(airportJson.airways, airportJson.fixes),
        new FixesValidator(airportJson.fixes),
        new MapsValidator(airportJson.maps),
        new RadioValidator(airportJson.radio),
        new RestrictedValidator(airportJson.restricted),
        new RunwaysValidator(airportJson.runways),
        new SidsValidator(airportJson.sids, airportJson.fixes),
        new SpawnPatternsValidator(airportJson.spawnPatterns, airlinesJson),
        new StarsValidator(airportJson.stars, airportJson.fixes),
        new WindValidator(airportJson.wind)
    ];

    for (let i = 0; i < validatorList.length; i++) {
        const validator = validatorList[i];

        Notifier.start(`- Validating: ${validator.name}`);
        validator.validate();

        if (!validator.isValid) {
            errorList = [
                ...errorList,
                ...validator.errors
            ];

            Notifier.fail();

            continue;
        }

        Notifier.succeed();
    }

    _renderResults(errorList);
}

module.exports = validator;
