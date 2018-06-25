module.exports = {
    UNDEFINED: {
        BASE_MESSAGE: 'Fail: Expected `{KEY}` key to exist in airport',
        LEVEL: 'ERROR'
    },
    MISSING_KEYS: {
        BASE_MESSAGE: 'Fail: `{KEY}` is missing the following required keys',
        LEVEL: 'ERROR'
    },
    INVALID_TYPE: {
        LEVEL: 'WARNING'
    },
    PROCEDURE: {
        KEY_ICAO_MISMATCH: {
            BASE_MESSAGE: 'Fail: Procedure key should match the procedure\'s `icao` property',
            LEVEL: 'ERROR'
        },
        UNDEFINED_FIX: {
            BASE_MESSAGE: 'Fail: Undefined fix(es) found in',
            LEVEL: 'ERROR'
        }
    },
};
