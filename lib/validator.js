const chalk = require('chalk');
const Notifier = require('./notifier');
const airportValidator = require('./validators/airportValidator');
const airspaceValidator = require('./validators/airspaceValidator');
const radioValidator = require('./validators/radioValidator');
const windValidator = require('./validators/windValidator');


const foundErrors = [];

/**
 *
 *
 *
 * @param {*} airportJson
 * @param {*} options
 */
function validator(airportJson, options) {
    const isValid = [];
    const validatorList = [
        airportValidator,
        radioValidator,
        windValidator,
        airspaceValidator
    ];

    for (let i = 0; i < validatorList.length; i++) {
        // Notifier.start();

        isValid.push(validatorList[i](foundErrors, airportJson));

        // if (!isValid) {
        //     Notifier.fail();

        //     continue;
        // }

        // Notifier.succeed();
    }

    console.log('\n', isValid, '\n\n', chalk.red(foundErrors.join('\n ')));
}

module.exports = validator;
