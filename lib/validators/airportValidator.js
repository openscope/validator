const Notifier = require('../notifier');
const hasAllKeys = require('../hasAllKeys');
const findMissingKeys = require('../findMissingKeys');
const errorMessages = require('./errorMessage');

const REQUIRED_KEYS = [
    'icao',
    'iata',
    'magnetic_north',
    'ctr_radius',
    'ctr_ceiling',
    'initial_alt',
    'position',
    'rr_radius_nm',
    'rr_center',
    'has_terrain',
    'wind',
    'arrivalRunway',
    'departureRunway',
    'airspace',
    'fixes',
    'restricted',
    'runways',
    'airways',
    'sids',
    'stars',
    'spawnPatterns',
    'maps'
];

function airportValidiator(foundErrors, airportJson) {
    Notifier.start({ text: '- Validating `airport`' });

    const hasRequiredKeys = hasAllKeys(REQUIRED_KEYS, airportJson);
    const missingKeys = findMissingKeys(REQUIRED_KEYS, airportJson);

    if (!hasRequiredKeys) {
        foundErrors.push(errorMessages.hasRequiredKeys);

        if (missingKeys.length !== 0) {
            foundErrors.push(`${errorMessages.hasMissingKeys} ${missingKeys.join(', ')}`);
        }

        Notifier.fail();

        return false;
    }

    Notifier.succeed();
    return true;
}

module.exports = airportValidiator;
