const t = require('tcomb');

const REGEX = {
    LATITUDE: {
        DECIMAL: /^[-ns]?([0-9]|[1-8][0-9]|90)(?:\.[0-9]{1,13})?$/i
    },
    LONGITUDE: {
        DECIMAL: /^[-ew]?([0-9]|[1-8][0-9]|9[0-9]|1[0-7][0-9]|180)(?:\.[0-9]{1,13})?$/i
    }
};
