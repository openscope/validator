const t = require('tcomb');
const StringOrNumberType = require('./common-types').StringOrNumberType;
const TwoElementStringOrNumberTypeList = require('./common-types').TwoElementStringOrNumberTypeList;
const ThreeElementStringOrNumberTypeList = require('./common-types').ThreeElementStringOrNumberTypeList;

const LAT_LONG_SEGMENT = {
    LATITUDE: 'LATITUDE',
    LONGITUDE: 'LONGITUDE',
};

const CARDINAL_LETTER = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W',
};

const LAT_LONG_SYMBOL = {
    DEGREES: 'd',
    MINUTES: 'm',
};

const ELEVATION_SUFFIX = 'ft';

// const

const LatitudeDegreeValueType = t.refinement(t.Any, (v) => {
    // TODO: move to t.union() or refinement
    if (!StringOrNumberType.is(v)) {
        return false;
    }

    return Math.abs(v) <= 90;
}, 'LatitudeDegreeValueType');

const LongitudeDegreeValueType = t.refinement(t.Any, (v) => {
    // TODO: move to t.union() or refinement
    if (!StringOrNumberType.is(v)) {
        return false;
    }

    return Math.abs(v) <= 180;
}, 'LongitudeDegreeValueType');

// 40.94684722
// "N40.94684722"
// "N40d56.811"
// "N40d56m48.65"

// -76.61727778
// "W76.61727778"
// "W076d37.037"
// "W076d37m02.20"

// [42.354662, -70.991598]
// ["N47d34.80m0", "W122d03.84m0"]
// ["N37.47860", "W122.60090"]
// [27.848198, 82.546200]
// ["N51d32m17.76", "W0d12m45.87"]
// [47.463767, -122.307749]
// const REGEX = {
//     LATITUDE: {
//         DECIMAL: /^[-ns]?([0-9]|[1-8][0-9]|90)(?:\.[0-9]{1,13})?$/i
//     },
//     LONGITUDE: {
//         DECIMAL: /^[-ew]?([0-9]|[1-8][0-9]|9[0-9]|1[0-7][0-9]|180)(?:\.[0-9]{1,13})?$/i
//     }
// };

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function hasCardinalLetterPrefix(value) {
    const firstIndexValue = value.substr(0, 1).toUpperCase();

    return firstIndexValue === CARDINAL_LETTER.NORTH ||
        firstIndexValue === CARDINAL_LETTER.EAST ||
        firstIndexValue === CARDINAL_LETTER.SOUTH ||
        firstIndexValue === CARDINAL_LETTER.WEST;
}

/**
 *
 * @function
 * @param {string} value
 * @returns {boolean}
 */
function hasLatitudeCardinalPrefix(value) {
    const firstIndexValue = value.substr(0, 1).toUpperCase();

    if (!hasCardinalLetterPrefix(value)) {
        return false;
    }

    return firstIndexValue === CARDINAL_LETTER.NORTH ||
        firstIndexValue === CARDINAL_LETTER.SOUTH;
}

/**
 *
 * @function
 * @param {string} value
 * @returns {boolean}
 */
function hasLongitudeCardinalPrefix(value) {
    const firstIndexValue = value.substr(0, 1).toUpperCase();

    if (!hasCardinalLetterPrefix(value)) {
        return false;
    }

    return firstIndexValue === CARDINAL_LETTER.EAST ||
        firstIndexValue === CARDINAL_LETTER.WEST;
}

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function hasDecimalSymbol(value) {
    return value.indexOf(LAT_LONG_SYMBOL.DEGREES) !== -1;
}

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function hasMinuteSymbol(value) {
    return value.indexOf(LAT_LONG_SYMBOL.MINUTES) !== -1;
}

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function isDegreesMinutesSeconds(value) {
    if (typeof value !== 'string') {
        return false;
    }

    return hasCardinalLetterPrefix(value) &&
        hasDecimalSymbol(value) &&
        hasMinuteSymbol(value);
}

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function isDegreesMinutes(value) {
    if (typeof value !== 'string') {
        return false;
    }

    return hasCardinalLetterPrefix(value) &&
        hasDecimalSymbol(value) &&
        !hasMinuteSymbol(value);
}

/**
 *
 *
 * @function
 * @param {number|string} value
 * @returns {boolean}
 */
function isDecimalDegreesStr(segment, value) {
    let valueAsNumber = value;

    if (hasCardinalLetterPrefix(value)) {
        valueAsNumber = value.substr(1);
    }

    if (segment === LAT_LONG_SEGMENT.LATITUDE) {
        return LatitudeDegreeValueType.is(valueAsNumber);
    }

    return LongitudeDegreeValueType.is(valueAsNumber);
}

function isDecimalDegreesNumber(segment, value) {
    if (typeof value !== 'number') {
        return false;
    }

    if (segment === LAT_LONG_SEGMENT.LATITUDE) {
        return LatitudeDegreeValueType.is(value);
    }

    return LongitudeDegreeValueType.is(value);
}

/**
 *
 *
 * @function
 * @param {LAT_LONG_SEGMENT} segment
 * @param {number|string} value
 * @returns {boolean}
 */
function isDecimalDegrees(segment, value) {
    if (typeof value === 'string') {
        return isDecimalDegreesStr(segment, value);
    }

    return isDecimalDegreesNumber(segment, value);
}

/**
 *
 * @function
 * @param {string[]} value
 * @returns {boolean}
 */
function isLatLongWithElevation(value) {
    return Array.isArray(value) && value.length === 3;
}

/**
 *
 * @function
 * @param {string} value
 * @returns {boolean}
 */
function isValidElevation(value) {
    return value.indexOf(ELEVATION_SUFFIX) !== -1;
}

const LatitudeDegreeMinuteSecondType = t.refinement(t.String, (v) => hasLatitudeCardinalPrefix(v) && isDegreesMinutesSeconds(v), 'LatitudeDegreeMinuteSecondType');
const LatitudeDegreeMinuteType = t.refinement(t.String, (v) => hasLatitudeCardinalPrefix(v) && isDegreesMinutes(v), 'LatitudeDegreeMinuteType');
const LatitudeDecimalDegreeType = t.refinement(t.String, (v) => isDecimalDegrees(LAT_LONG_SEGMENT.LATITUDE, v), 'LatitudeDecimalDegreeType');

const LongitudeDegreeMinuteSecondType = t.refinement(t.String, (v) => hasLongitudeCardinalPrefix(v) && isDegreesMinutesSeconds(v), 'LongitudeDegreeMinuteSecondType');
const LongitudeDegreeMinuteType = t.refinement(t.String, (v) => hasLongitudeCardinalPrefix(v) && isDegreesMinutes(v), 'LongitudeDegreeMinuteType');
const LongitudeDecimalDegreeType = t.refinement(t.String, (v) => v, 'LongitudeDecimalDegreeType');

const LatitudeType = null;
const LongitudeType = null;
const ElevationType = null;

module.exports = {
    LatitudeDegreeValueType: LatitudeDegreeValueType,
    LongitudeDegreeValueType: LongitudeDegreeValueType,
    hasCardinalLetterPrefix: hasCardinalLetterPrefix,
    hasLatitudeCardinalPrefix: hasLatitudeCardinalPrefix,
    hasLongitudeCardinalPrefix: hasLongitudeCardinalPrefix,
    hasDecimalSymbol: hasDecimalSymbol,
    hasMinuteSymbol: hasMinuteSymbol,
    isDegreesMinutesSeconds: isDegreesMinutesSeconds,
    isDegreesMinutes: isDegreesMinutes,
    isDecimalDegreesStr: isDecimalDegreesStr,
    isDecimalDegreesNumber: isDecimalDegreesNumber,
    isDecimalDegrees: isDecimalDegrees,
    isLatLongWithElevation: isLatLongWithElevation,
    isValidElevation: isValidElevation,
    LatitudeDegreeMinuteSecondType: LatitudeDegreeMinuteSecondType,
    LatitudeDegreeMinuteType: LatitudeDegreeMinuteType,
    LatitudeDecimalDegreeType: LatitudeDecimalDegreeType,
    LongitudeDegreeMinuteSecondType: LongitudeDegreeMinuteSecondType,
    LongitudeDegreeMinuteType: LongitudeDegreeMinuteType,
    LongitudeDecimalDegreeType: LongitudeDecimalDegreeType,
    // LatitudeType: LatitudeType,
    // LongitudeType: LongitudeType,
    // ElevationType: ElevationType,
};
