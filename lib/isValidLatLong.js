const REGEX = {
    NS_LATITUDE: /^[NS]?[0-8][0-9]\.\d{1,9}/gi,
    EW_LONGITUDE: /^[EW]?[0-1][0-7][0-9]\.\d{1,9}/gi
};

/**
 *
 * @param {string} latitude
 */
function _isValidLatitude(latitude) {
    const isValid = REGEX.NS_LATITUDE.test(latitude);

    return isValid;
}

/**
 *
 * @param {string} longitude
 */
function _isValidLongitude(longitude) {
    const isValid = REGEX.EW_LONGITUDE.test(longitude);

    return isValid;
}

/**
 *
 * @param {string[]} position
 */
function isValidLatLong(position) {
    if (position.length !== 2) {
        return false;
    }

    const isValid = _isValidLatitude(position[0]) && _isValidLongitude(position[1]);

    return isValid;
}

module.exports = isValidLatLong;
