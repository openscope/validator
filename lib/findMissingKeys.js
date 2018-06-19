const _difference = require('lodash').difference;
const hasAllKeys = require('./hasAllKeys');

/**
 * Find any keys that do not exist within `obj` and are expected to
 *
 * @function findMissingKeys
 * @param {string[]} keysToFind
 * @param {object} obj
 * @returns {string[]} list of keys missing from provided `obj`
 */
function findMissingKeys(keysToFind, obj) {
    const objKeys = Object.keys(obj);

    if (hasAllKeys(keysToFind, obj)) {
        return [];
    }

    return _difference(keysToFind, objKeys);
}

module.exports = findMissingKeys;
