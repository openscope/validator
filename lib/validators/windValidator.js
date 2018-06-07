const Notifier = require('../notifier');
const hasAllKeys = require('../hasAllKeys');
const ERROR_MESSAGE = require('./errorMessage');

const REQUIRED_KEYS = [
    'angle',
    'speed'
];

function windValidator(foundErrors, airportJson) {
    Notifier.start({ text: '- Validating `wind`' });

    const wind = airportJson.wind;

    if (typeof wind === 'undefined') {
        foundErrors.push(ERROR_MESSAGE.EXPECTED_WIND_TO_EXIST_IN_AIRPORT);
        Notifier.fail();

        return false;
    }

    if (!hasAllKeys(REQUIRED_KEYS, wind)) {
        foundErrors.push(ERROR_MESSAGE.REQUIRED_KEYS_WIND);
        Notifier.fail();

        return false;
    }

    Notifier.succeed();

    return true;
}

module.exports = windValidator;
