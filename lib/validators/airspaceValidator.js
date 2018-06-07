const Notifier = require('../notifier');
const findMissingKeys = require('../findMissingKeys');
const ERROR_MESSAGE = require('./errorMessage');

const REQUIRED_KEYS = [
    'ceiling',
    'floor',
    'airspace_class',
    'poly'
];

function airspaceValidator(foundErrors, airportJson) {
    const airspace = airportJson.airspace;

    if (typeof airspace === 'undefined') {
        foundErrors.push(ERROR_MESSAGE.EXPECTED_AIRSPACE_TO_EXIST_IN_AIRPORT)
        Notifier.fail();

        return false;
    }

    const missingKeys = findMissingKeys(REQUIRED_KEYS, airspace[0]);

    if (missingKeys.length !== 0) {
        foundErrors.push(`${ERROR_MESSAGE.REQUIRED_KEYS_AIRSPACE} ${missingKeys.join(', ')}`);
        Notifier.fail();

        return false;
    }

    Notifier.succeed();

    return true;
}

module.exports = airspaceValidator;
