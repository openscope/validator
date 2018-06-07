const Notifier = require('../notifier');
const ERROR_MESSAGE = require('./errorMessage');
const hasAllKeys = require('../hasAllKeys');

/**
 * Expects to receive an object like:
 *
    "radio": {
        "twr": "Seatle Tower",
        "app": "Seattle Approach",
        "dep": "Seattle Departure"
    }
 *
 * @function radioValidator
 * @param {string[]} foundErrors
 * @param {object} airportJson
 * @returns {booelan}
 */
function radioValidator(foundErrors, airportJson) {
    Notifier.start({ text: '- Validating `radio`\n' });

    const radio = airportJson.radio;

    if (typeof radio === 'undefined') {
        foundErrors.push('FAIL: Expected `radio` key to exist in airport');
        Notifier.fail();

        return false;
    }

    const hasRequiredKeys = hasAllKeys(['twr', 'app', 'dep'], radio);

    if (hasRequiredKeys) {
        Notifier.succeed();

        return true;
    }

    foundErrors.push(ERROR_MESSAGE.REQUIRED_KEYS_RADIO);
    Notifier.fail();

    return false;
}

module.exports = radioValidator;
