const ERROR_MESSAGE_MOCK = {
    UNDEFINED: {
        BASE: 'Fail: Expected `{KEY}` key to exist in airport',
        // below are used only in tests and should be removed
        AIRSPACE: 'Fail: Expected `airspace` key to exist in airport',
        AIRWAYS: 'Fail: Expected `airways` key to exist in airport',
        FIXES: 'Fail: Expected `fixes` key to exist in airport',
        MAPS: 'Fail: Expected `maps` key to exist in airport',
        RADIO: 'Fail: Expected `radio` key to exist in airport',
        RESTRICTED: 'Fail: Expected `restricted` key to exist in airport',
        RUNWAYS: 'Fail: Expected `runways` key to exist in airport',
        SIDS: 'Fail: Expected `sids` key to exist in airport',
        STARS: 'Fail: Expected `stars` key to exist in airport',
        SPAWN_PATTERNS: 'Fail: Expected `spawnPatterns` key to exist in airport',
        WIND: 'Fail: Expected `wind` key to exist in airport',
    },
    MISSING_KEYS: {
        BASE: 'Fail: `{KEY}` is missing the following required keys',
        // below are used only in tests and should be removed
        AIRPORT: 'Fail: `airport` is missing the following required keys',
        AIRSPACE: 'Fail: `airspace` is missing the following required keys',
        AIRWAYS: 'Fail: `airways` is missing the following required keys',
        FIXES: 'Fail: `fixes` is missing the following required keys',
        MAPS: 'Fail: `maps` is missing the following required keys',
        RADIO: 'Fail: `radio` is missing the following required keys',
        RUNWAYS: 'Fail: `runways` is missing the following required keys',
        WIND: 'Fail: `wind` is missing the following required keys'
    },
    PROCEDURE: {
        UNDEFINED_FIX: {
            SID: 'Fail: Undefined fix(es) found in SID - SUMMA1: THREVE, $TEXAS',
            STAR: 'Fail: Undefined fix(es) found in STAR - HAWKZ6: THREVE, $TEXAS'
        }
    }
}

module.exports = ERROR_MESSAGE_MOCK;
