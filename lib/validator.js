const chalk = require('chalk');
// const Notifier = require('./notifier');
const AirportValidator = require('./validators/AirportValidator');
const AirspaceValidator = require('./validators/AirspaceValidator');
const FixesValidator = require('./validators/FixesValidator');
const RadioValidator = require('./validators/RadioValidator');
const RestrictedValidator = require('./validators/RestrictedValidator');
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
    validatorList.push(new RestrictedValidator(airportJson.restricted));
    validatorList.push(new WindValidator(airportJson.wind));

    for (let i = 0; i < validatorList.length; i++) {
        // Notifier.start();

        const validator = validatorList[i];

        validator.validate();

        isValid.push(validator.isValid);

        if (!validator.isValid) {
            foundErrors = [
                ...foundErrors,
                validator.errors
            ];
        }

        // Notifier.succeed();
    }

    console.log('\n', isValid, '\n\n', chalk.red(foundErrors.join('\n ')));
}

module.exports = validator;
