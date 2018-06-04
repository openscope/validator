const Notifier = require('./notifier');
const validators = require('./validators/validators');

function airportValidator(airportJson, options) {
    console.log('+++\n', Object.keys(airportJson));

    validators.radioValidator(airportJson.radio);
}

module.exports = airportValidator;
