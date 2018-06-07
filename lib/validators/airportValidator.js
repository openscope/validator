const Notifier = require('../notifier');
const hasAllKeys = require('../hasAllKeys');
const findMissingKeys = require('../findMissingKeys');
const ERROR_MESSAGE = require('./errorMessage');

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

    // const hasRequiredKeys = hasAllKeys(REQUIRED_KEYS, airportJson);
    const missingKeys = findMissingKeys(REQUIRED_KEYS, airportJson);

    if (missingKeys.length !== 0) {
        foundErrors.push(`${ERROR_MESSAGE.MISSING_KEYS_AIRPORT} ${missingKeys.join(', ')}`);
        Notifier.fail();

        return false;
    }

    Notifier.succeed();

    return true;
}

module.exports = airportValidiator;
