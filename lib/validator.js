const chalk = require('chalk');
const Notifier = require('./notifier');
const validators = require('./validators/validators');

const foundErrors = [];

function validator(airportJson, options) {
    const isValid = [
        validators.airportValidator(foundErrors, airportJson),
        validators.radioValidator(foundErrors, airportJson.radio)
    ];

    console.log('\n', isValid, '\n\n', chalk.red(foundErrors.join('\n ')));
}

module.exports = validator;
