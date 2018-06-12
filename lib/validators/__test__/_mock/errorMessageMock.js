const ERROR_MESSAGE_MOCK = {
    UNDEFINED: {
        BASE: 'FAIL: Expected `{KEY}` key to exist in airport',
        // below are used only in tests and should be removed
        AIRSPACE: 'FAIL: Expected `airspace` key to exist in airport',
        AIRWAYS: 'FAIL: Expected `airways` key to exist in airport',
        FIXES: 'FAIL: Expected `fixes` key to exist in airport',
        RADIO: 'FAIL: Expected `radio` key to exist in airport',
        RESTRICTED: 'FAIL: Expected `restricted` key to exist in airport',
        RUNWAYS: 'FAIL: Expected `runways` key to exist in airport',
        SPAWN_PATTERNS: 'FAIL: Expected `spawnPatterns` key to exist in airport',
        WIND: 'FAIL: Expected `wind` key to exist in airport',
    },
    MISSING_KEYS: {
        BASE: 'FAIL: `{KEY}` is missing the following required keys',
        // below are used only in tests and should be removed
        AIRPORT: 'FAIL: `airport` is missing the following required keys',
        AIRSPACE: 'FAIL: `airspace` is missing the following required keys',
        AIRWAYS: 'FAIL: `airways` is missing the following required keys',
        FIXES: 'FAIL: `fixes` is missing the following required keys',
        RADIO: 'FAIL: `radio` is missing the following required keys',
        RUNWAYS: 'FAIL: `runways` is missing the following required keys',
        WIND: 'FAIL: `wind` is missing the following required keys'
    },

}

module.exports = ERROR_MESSAGE_MOCK;