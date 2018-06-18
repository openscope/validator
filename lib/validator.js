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

/**
 *
 *
 * @function validator
 * @param {object} airportJson
 * @param {CliOptionsType} options
 */
function validator(airportJson, options) {
    let foundErrors = [];
    const isValid = [];
    const validatorList = [
        new AirportValidator(airportJson),
        new AirspaceValidator(airportJson.airspace),
        new AirwaysValidator(airportJson.airways),
        new FixesValidator(airportJson.fixes),
        new MapsValidator(airportJson.maps),
        new RadioValidator(airportJson.radio),
        new RestrictedValidator(airportJson.restricted),
        new RunwaysValidator(airportJson.runways),
        new SidsValidator(airportJson.sids),
        new SpawnPatternsValidator(airportJson.spawnPatterns),
        new StarsValidator(airportJson.stars),
        new WindValidator(airportJson.wind)
    ];

    for (let i = 0; i < validatorList.length; i++) {
        const validator = validatorList[i];
        Notifier.start(`- Validating: ${validator.name}`);
        validator.validate();

        isValid.push(validator.isValid);


        if (!validator.isValid) {
            foundErrors = [
                ...foundErrors,
                validator.errors
            ];

            Notifier.fail();

            continue;
        }

        Notifier.succeed();
    }

    console.log('\n', isValid, '\n\n', chalk.red(foundErrors.join('\n ')));
}

module.exports = validator;
