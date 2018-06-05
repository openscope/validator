const _ = require('lodash');
const hasAllKeys = require('./hasAllKeys');

function findMissingKeys(keys, obj) {
    const objKeys = Object.keys(obj);

    if (hasAllKeys(keys, obj)) {
        return [];
    }

    return _.difference(keys, objKeys);
}

module.exports = findMissingKeys;
