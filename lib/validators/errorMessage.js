module.exports = {
    UNDEFINED: {
        BASE: 'FAIL: If you see this error, something has gone drastically wrong!!',
        AIRSPACE: 'FAIL: Expected `airspace` key to exist in airport',
        FIXES: 'FAIL: Expected `fixes` key to exist in airport',
        RADIO: 'FAIL: Expected `radio` key to exist in airport',
        WIND: 'FAIL: Expected `wind` key to exist in airport',
    },
    MISSING_KEYS: {
        AIRPORT: 'FAIL: `airport` is missing the following required keys',
        AIRSPACE: 'FAIL: `airspace` is missing the following required keys',
        FIXES: 'FAIL: `fixes` is missing the following required keys',
        RADIO: 'FAIL: `radio` is missing the following required keys',
        WIND: 'FAIL: `wind` is missing the following required keys'
    },

    // DEPRECATED
    MISSING_KEYS_AIRPORT: 'FAILED: `airport` is missing the following keys:',
    INVALID_DATA_LAT_LONG: 'INVALID: incorrect Latitude/Longitude format'
};
