const Notifier = require('../notifier');
const errorMessage = require('./errorMessage');
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

    const hasCorrectKeyLength = Object.keys(radio).length === 3;
    const hasRequiredKeys = hasAllKeys(['twr', 'app', 'dep'], radio);
    const isValid = hasCorrectKeyLength && hasRequiredKeys;

    if (isValid) {
        Notifier.succeed();

        return isValid;
    }

    if (!hasCorrectKeyLength) {
        foundErrors.push(errorMessage.hasCorrectKeyLength);
    }

    if (!hasRequiredKeys) {
        foundErrors.push(errorMessage.hasRequiredKeys);
    }

    Notifier.fail();

    return isValid;
}

module.exports = radioValidator;
