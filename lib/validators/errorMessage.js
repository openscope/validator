module.exports = {
    UNDEFINED: {
        BASE: 'FAIL: Expected `{KEY}` key to exist in airport',
    },
    MISSING_KEYS: {
        BASE: 'FAIL: Expected `{KEY}` key to exist in airport',
        // DEPRECATED
        AIRPORT: 'FAIL: `airport` is missing the following required keys',
        AIRSPACE: 'FAIL: `airspace` is missing the following required keys',
        AIRWAYS: 'FAIL: `airways` is missing the following required keys',
        FIXES: 'FAIL: `fixes` is missing the following required keys',
        RADIO: 'FAIL: `radio` is missing the following required keys',
        RUNWAYS: 'FAIL: `runways` is missing the following required keys',
        WIND: 'FAIL: `wind` is missing the following required keys'
    },

    // DEPRECATED
    MISSING_KEYS_AIRPORT: 'FAILED: `airport` is missing the following keys:',
    INVALID_DATA_LAT_LONG: 'INVALID: incorrect Latitude/Longitude format'
};
