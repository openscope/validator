const Notifier = require('./notifier');
const validators = require('./validators/validators');
const foundErrors = [];

function airportValidator(airportJson, options) {
    const isValid = [
        validators.radioValidator(foundErrors, airportJson.radio)
    ];

    console.log('\n', isValid, '\n\n', foundErrors);
}

module.exports = airportValidator;
