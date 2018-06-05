const Notifier = require('../notifier');
const errorMessage = require('./errorMessage');
const hasAllKeys = require('../hasAllKeys');

function radioValidator(foundErrors, radio) {
    Notifier.start({ text: '- Validating `radio`\n' });

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
