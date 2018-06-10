const Notifier = require('../notifier');
const ERROR_MESSAGE = require('./errorMessage');

function fixValidator(foundErrors, airportJson) {
    Notifier.start({ text: '- Validating `fixes`' });

    const fixList = airportJson.fixes;

    if (typeof fixList === 'undefined') {
        foundErrors.push(ERROR_MESSAGE.EXPECTED_FIXES_TO_EXIST_IN_AIRPORT);
        Notifier.fail();

        return false;
    }

    Notifier.succeed();

    return true;
}

module.exports = fixValidator
