const Notifier = require('../notifier');
const findMissingKeys = require('../findMissingKeys');
const isValidLatLong = require('../isValidLatLong');
const ERROR_MESSAGE = require('./errorMessage');

const REQUIRED_KEYS = [
    'ceiling',
    'floor',
    'airspace_class',
    'poly'
];

function _isAirspacePolyValid(foundErrors, airspacePoly) {
    for (let i = 0; i < airspacePoly.length; i++) {
        const latLongItem = airspacePoly[i];
        const isValid = isValidLatLong(latLongItem);

        if (!isValid) {
            foundErrors.push(`${ERROR_MESSAGE.INVALID_DATA_LAT_LONG}: [${latLongItem.join(', ')}]`);
        }
    }
}

function airspaceValidator(foundErrors, airportJson) {
    const airspace = airportJson.airspace;

    if (typeof airspace === 'undefined') {
        foundErrors.push(ERROR_MESSAGE.EXPECTED_AIRSPACE_TO_EXIST_IN_AIRPORT)
        Notifier.fail();

        return false;
    }

    for (let i = 0; i < airspace.length; i++) {
        Notifier.start({ text: `- Validating 'airspace' poly #${i}` });

        const airspaceSegment = airspace[i];
        const missingKeys = findMissingKeys(REQUIRED_KEYS, airspaceSegment);
        // const airspaceSegmentLatLongErrors = [];

        // _isAirspacePolyValid(airspaceSegmentLatLongErrors, airspaceSegment.poly);

        if (missingKeys.length !== 0) {
            foundErrors.push(`${ERROR_MESSAGE.REQUIRED_KEYS_AIRSPACE.replace('{POLY_ID}', i)} ${missingKeys.join(', ')}`);
            Notifier.fail();

            return false;
        }

        // if (airspaceSegmentLatLongErrors.length !== 0) {
        //     airspaceSegmentLatLongErrors.forEach((errorItem) => foundErrors.push(errorItem));

        //     Notifier.fail();

        //     return false;
        // }

        Notifier.succeed();
    }

    return true;
}

module.exports = airspaceValidator;
