/**
 * Determine if `obj` contains all the `keys`
 *
 * @param {string[]} keys
 * @param {object} obj
 * @return {boolean}
 */
function hasAllKeys(keys, obj) {
    const objKeys = Object.keys(obj);

    if (keys.length > objKeys.length) {
        return false;
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (objKeys.indexOf(key) === -1) {
            return false;
        }
    }

    return true;
}

module.exports = hasAllKeys;
