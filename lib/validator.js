const chalk = require('chalk');
const Notifier = require('./notifier');
const airportValidator = require('./validators/airportValidator');
const radioValidator = require('./validators/radioValidator');

const foundErrors = [];

function validator(airportJson, options) {
    const isValid = [];
    const validatorList = [
        airportValidator,
        radioValidator
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
