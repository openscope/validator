module.exports = {
    UNDEFINED: {
        AIRSPACE: 'FAIL: Expected `airspace` key to exist in airport',
        RADIO: 'FAIL: Expected `radio` key to exist in airport',
        WIND: 'FAIL: Expected `wind` key to exist in airport',
        BASE: 'FAIL: If you see this error, something has gone drastically wrong!!'
    },
    MISSING_KEYS: {
        AIRPORT: 'FAIL: `airport` is missing the following required keys',
        AIRSPACE: 'FAIL: `airspace` is missing the following required keys',
        RADIO: 'FAIL: `radio` is missing the following required keys',
        WIND: 'FAIL: `wind` is missing the following required keys'
    },

    // DEPRECATED
    MISSING_KEYS_AIRPORT: 'FAILED: `airport` is missing the following keys:',
    EXPECTED_AIRSPACE_TO_EXIST_IN_AIRPORT: 'FAIL: Expected `airspace` key to exist in airport',
    EXPECTED_FIXES_TO_EXIST_IN_AIRPORT: 'FAIL: Expected `fixes` key to exist in airport',
    EXPECTED_RADIO_TO_EXIST_IN_AIRPORT: 'FAIL: Expected `radio` key to exist in airport',
    EXPECTED_WIND_TO_EXIST_IN_AIRPORT: 'FAIL: Expected `wind` key to exist in airport',
    INVALID_DATA_LAT_LONG: 'INVALID: incorrect Latitude/Longitude format',
    REQUIRED_KEYS_AIRSPACE: 'FAILED: `airspace` poly section #{POLY_ID} is missing the following keys:',
    REQUIRED_KEYS_RADIO: 'FAILED: `radio` section is expected to have three keys: `twr`, `app` and `dep`',
    REQUIRED_KEYS_WIND: 'FAILED: `wind` section is expected to have two keys: `angle` and `speed`'
};
