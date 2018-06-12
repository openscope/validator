const chalk = require('chalk');
const Notifier = require('./Notifier');
const AirportValidator = require('./validators/AirportValidator');
const AirspaceValidator = require('./validators/AirspaceValidator');
const FixesValidator = require('./validators/FixesValidator');
const MapsValidator = require('./validators/MapsValidator');
const RadioValidator = require('./validators/RadioValidator');
const RestrictedValidator = require('./validators/RestrictedValidator');
const RunwaysValidator = require('./validators/RunwaysValidator');
const SidsValidator = require('./validators/SidsValidator');
const StarsValidator = require('./validators/StarsValidator');
const SpawnPatternsValidator = require('./validators/SpawnPatternsValidator');
const WindValidator = require('./validators/WindValidator');

let foundErrors = [];
const validatorList = [];

/**
 *
 *
 *
 * @param {*} airportJson
 * @param {*} options
 */
function validator(airportJson, options) {
    const isValid = [];
    validatorList.push(new AirportValidator(airportJson));
    validatorList.push(new AirspaceValidator(airportJson.airspace));
    validatorList.push(new RadioValidator(airportJson.radio));
    validatorList.push(new FixesValidator(airportJson.fixes));
    validatorList.push(new MapsValidator(airportJson.maps));
    validatorList.push(new RestrictedValidator(airportJson.restricted));
    validatorList.push(new RunwaysValidator(airportJson.runways));
    validatorList.push(new SidsValidator(airportJson.sids));
    validatorList.push(new StarsValidator(airportJson.stars));
    validatorList.push(new SpawnPatternsValidator(airportJson.spawnPatterns));
    validatorList.push(new WindValidator(airportJson.wind));

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
