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

const LatitudeDegreeValueType = t.refinement(StringOrNumberType, (v) => Math.abs(v) <= 90, 'LatitudeDegreeValueType');
const LongitudeDegreeValueType = t.refinement(StringOrNumberType, (v) => Math.abs(v) <= 180, 'LongitudeDegreeValueType');

/**
 * Checks for the presence of `CARDINAL_LETTER` at he beginning of `value`
 *
 * @function hasCardinalLetterPrefix
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
 * Check for specifically `N` or `S` at the beginning of `value`
 *
 * @function hasLatitudeCardinalPrefix
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
 * Check for specifically `E` or `W` at the beginning of `value`
 *
 * @function hasLongitudeCardinalPrefix
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
 * Check for presence of `d` symbol in `value`
 *
 * @function hasDecimalDegreeSymbol
 * @param {number|string} value
 * @returns {boolean}
 */
function hasDecimalDegreeSymbol(value) {
    return value.indexOf(LAT_LONG_SYMBOL.DEGREES) !== -1;
}

/**
 * Check for presence of `m` symbol in `value`
 *
 * @function hasMinuteSymbol
 * @param {number|string} value
 * @returns {boolean}
 */
function hasMinuteSymbol(value) {
    return value.indexOf(LAT_LONG_SYMBOL.MINUTES) !== -1;
}

/**
 * Checks if `value` is in Degree, Minutes, Seconds format
 *
 * example:
 * - `N40d56m48.65`
 * - `W076d37m02.20`
 *
 * @function isDegreesMinutesSeconds
 * @param {number|string} value
 * @returns {boolean}
 */
function isDegreesMinutesSeconds(value) {
    if (typeof value !== 'string') {
        return false;
    }

    return hasCardinalLetterPrefix(value) &&
        hasDecimalDegreeSymbol(value) &&
        hasMinuteSymbol(value);
}

/**
 * Checks if `value` is in Degree, Minutes format
 *
 * example:
 * - `N40d56.811`
 * - `W076d37.037`
 *
 * @function isDegreesMinutes
 * @param {number|string} value
 * @returns {boolean}
 */
function isDegreesMinutes(value) {
    if (typeof value !== 'string') {
        return false;
    }

    return hasCardinalLetterPrefix(value) &&
        hasDecimalDegreeSymbol(value) &&
        !hasMinuteSymbol(value);
}

/**
 * Checks for `value` against possible `Latitude` Decimal Degree formats
 *
 * @function isLatitudeDecimalDegreeStr
 * @param {number|string} value
 * @returns {boolean}
 */
function isLatitudeDecimalDegreeStr(value) {
    if (hasCardinalLetterPrefix(value)) {
        const valueAsNumber = value.substr(1);

        return hasLatitudeCardinalPrefix(value) && LatitudeDegreeValueType.is(valueAsNumber);
    }

    return LatitudeDegreeValueType.is(value);
}

/**
 * Checks for `value` against possible `Longitude` Decimal Degree formats
 *
 * @function isLongitudeDecimalDegreeStr
 * @param {number|string} value
 * @returns {boolean}
 */
function isLongitudeDecimalDegreeStr(value) {
    if (hasCardinalLetterPrefix(value)) {
        const valueAsNumber = value.substr(1);

        return hasLongitudeCardinalPrefix(value) && LongitudeDegreeValueType.is(valueAsNumber);
    }

    return LongitudeDegreeValueType.is(value);
}

/**
 * Checks if `value` is a Decimal Degree string
 *
 * @function isDecimalDegreeStr
 * @param {number|string} value
 * @returns {boolean}
 */
function isDecimalDegreeStr(segment, value) {
    if (segment === LAT_LONG_SEGMENT.LATITUDE) {
        return isLatitudeDecimalDegreeStr(value);
    }

    return isLongitudeDecimalDegreeStr(value);
}

/**
 * Checks if `value` is a Decimal Degree number
 *
 * @function isDecimalDegreesNumber
 * @param {LAT_LONG_SEGMENT} segment
 * @param {number|string} value
 * @returns {boolean}
 */
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
 * Checks if `value` is Decimal Degree format
 *
 * example:
 * - `40.94684722`
 * - `"N40.94684722"`
 * - `-80.94684722`
 * - `"W175.94684722"`
 *
 * @function isDecimalDegrees
 * @param {LAT_LONG_SEGMENT} segment
 * @param {number|string} value
 * @returns {boolean}
 */
function isDecimalDegrees(segment, value) {
    if (typeof value === 'string') {
        return isDecimalDegreeStr(segment, value);
    }

    return isDecimalDegreesNumber(segment, value);
}

/**
 * Checks if `value` contains `ELEVATION_SUFFIX`
 *
 * @function isValidElevation
 * @param {string} value
 * @returns {boolean}
 */
function isValidElevation(value) {
    return value.indexOf(ELEVATION_SUFFIX) !== -1;
}

const LatitudeDegreeMinuteSecondType = t.refinement(t.String, (v) => hasLatitudeCardinalPrefix(v) && isDegreesMinutesSeconds(v), 'LatitudeDegreeMinuteSecondType');
const LatitudeDegreeMinuteType = t.refinement(t.String, (v) => hasLatitudeCardinalPrefix(v) && isDegreesMinutes(v), 'LatitudeDegreeMinuteType');
const LatitudeDecimalDegreeType = t.refinement(StringOrNumberType, (v) => isDecimalDegrees(LAT_LONG_SEGMENT.LATITUDE, v), 'LatitudeDecimalDegreeType');

/**
 * Encapsulation of all possible `Latitude` types
 * - Decimal Degrees
 * - Degree Minutes
 * - Degree Minute Seconds
 *
 * Leverages `tcomb.union()` and `dispatch` to use the appropriate type given a value:`v`
 *
 * @type LatitudeType
 */
const LatitudeType = t.union([
    LatitudeDegreeMinuteSecondType,
    LatitudeDegreeMinuteType,
    LatitudeDecimalDegreeType
], 'LatitudeType');

LatitudeType.dispatch = (v) => {
    if (isDegreesMinutesSeconds(v)) {
        return LatitudeDegreeMinuteSecondType;
    } else if (isDegreesMinutes(v)) {
        return LatitudeDegreeMinuteType;
    }

    return LatitudeDecimalDegreeType;
};

const LongitudeDegreeMinuteSecondType = t.refinement(t.String, (v) => hasLongitudeCardinalPrefix(v) && isDegreesMinutesSeconds(v), 'LongitudeDegreeMinuteSecondType');
const LongitudeDegreeMinuteType = t.refinement(t.String, (v) => hasLongitudeCardinalPrefix(v) && isDegreesMinutes(v), 'LongitudeDegreeMinuteType');
const LongitudeDecimalDegreeType = t.refinement(StringOrNumberType, (v) => isDecimalDegrees(LAT_LONG_SEGMENT.LONGITUDE, v), 'LongitudeDecimalDegreeType');

/**
 * Encapsulation of all possible `Latitude` types
 * - Decimal Degrees
 * - Degree Minutes
 * - Degree Minute Seconds
 *
 * Leverages `tcomb.union()` and `dispatch` to use the appropriate type given a value:`v`
 *
 * @type LongitudeType
 */
const LongitudeType = t.union([
    LongitudeDegreeMinuteSecondType,
    LongitudeDegreeMinuteType,
    LongitudeDecimalDegreeType
], 'LongitudeType');;

LongitudeType.dispatch = (v) => {
    if (isDegreesMinutesSeconds(v)) {
        return LongitudeDegreeMinuteSecondType;
    } else if (isDegreesMinutes(v)) {
        return LongitudeDegreeMinuteType;
    }

    return LongitudeDecimalDegreeType;
};

/**
 * Describes an elevation value
 *
 * example:
 * - `123ft`
 *
 * @type ElevationType
 */
const ElevationType = t.refinement(t.String, (v) => isValidElevation(v));

/**
 * Defines a `Latitude` and `Longitude` data type
 *
 * Looks specifically at each value at index and validates that data
 * against the appropriate data type
 *
 * @type LatitudeLongitudeType
 */
const LatitudeLongitudeType = t.refinement(t.list(StringOrNumberType), (v) => {
    if (!TwoElementStringOrNumberTypeList.is(v)) {
        return false;
    }

    const latitude = v[0];
    const longitude = v[1];

    return LatitudeType.is(latitude) && LongitudeType.is(longitude);
});

/**
 * Defines a `Latitude` `Longitude` and `Elevation` data type
 *
 * Looks specifically at each value at index and validates that data
 * against the appropriate data type
 *
 * @type LatitudeLongitudeElevationType
 */
const LatitudeLongitudeElevationType = t.refinement(t.list(StringOrNumberType), (v) => {
    if (!ThreeElementStringOrNumberTypeList.is(v)) {
        return false;
    }

    const latitude = v[0];
    const longitude = v[1];
    const elevation = v[2];

    return LatitudeType.is(latitude) &&
        LongitudeType.is(longitude) &&
        ElevationType.is(elevation);
});

 /**
  * Encapsulates all the various Latitude, Longitude and Elevation type logic available
  * to determine if a given `v` is valid
  *
  * example:
  * - `[42.354662, -70.991598]`
  * - `[47.463767, -122.307749]`
  * - `[47.463767, -122.307749, "200ft"]`
  * - `["N37.47860", "W122.60090"]`
  * - `["N47d34.80m0", "W122d03.84m0"]`
  * - `["N51d32m17.76", "W0d12m45.87", "20ft"]`
  *
  * @public
  * @type LatLongType
  */
const LatLongType = t.union([
    LatitudeLongitudeType,
    LatitudeLongitudeElevationType
], 'LatLongType');

LatLongType.dispatch = function (v) {
    if (ThreeElementStringOrNumberTypeList.is(v)) {
        return LatitudeLongitudeElevationType;
    }

    return LatitudeLongitudeType;
};

module.exports = {
    LatitudeDegreeValueType: LatitudeDegreeValueType,
    LongitudeDegreeValueType: LongitudeDegreeValueType,
    hasCardinalLetterPrefix: hasCardinalLetterPrefix,
    hasLatitudeCardinalPrefix: hasLatitudeCardinalPrefix,
    hasLongitudeCardinalPrefix: hasLongitudeCardinalPrefix,
    hasDecimalDegreeSymbol: hasDecimalDegreeSymbol,
    hasMinuteSymbol: hasMinuteSymbol,
    isDegreesMinutesSeconds: isDegreesMinutesSeconds,
    isDegreesMinutes: isDegreesMinutes,
    isLatitudeDecimalDegreeStr: isLatitudeDecimalDegreeStr,
    isLongitudeDecimalDegreeStr: isLongitudeDecimalDegreeStr,
    isDecimalDegreeStr: isDecimalDegreeStr,
    isDecimalDegreesNumber: isDecimalDegreesNumber,
    isDecimalDegrees: isDecimalDegrees,
    isValidElevation: isValidElevation,
    LatitudeDegreeMinuteSecondType: LatitudeDegreeMinuteSecondType,
    LatitudeDegreeMinuteType: LatitudeDegreeMinuteType,
    LatitudeDecimalDegreeType: LatitudeDecimalDegreeType,
    LongitudeDegreeMinuteSecondType: LongitudeDegreeMinuteSecondType,
    LongitudeDegreeMinuteType: LongitudeDegreeMinuteType,
    LongitudeDecimalDegreeType: LongitudeDecimalDegreeType,
    LatitudeType: LatitudeType,
    LongitudeType: LongitudeType,
    ElevationType: ElevationType,
    LatitudeLongitudeType: LatitudeLongitudeType,
    LatitudeLongitudeElevationType: LatitudeLongitudeElevationType,
    LatLongType: LatLongType
};
