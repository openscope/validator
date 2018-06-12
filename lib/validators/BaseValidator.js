const _snakeCase = require('lodash').snakeCase;
// const Notifier = require('../notifier');
const hasAllKeys = require('../hasAllKeys');
const findMissingKeys = require('../findMissingKeys');
const REQUIRED_KEYS = require('./requiredKeys');
const ERROR_MESSAGE = require('./errorMessage');

let _id = 0;

class BaseValidator {

    get errors() {
        return this._errors;
    }

    get isValid() {
        return this._errors.length === 0;
    }

    get keyName() {
        return _snakeCase(this._name).toUpperCase();
    }

    get name() {
        return this._name;
    }

    constructor(name, json) {
        this._id = (_id)++;
        this._errors = [];
        this._data = json;
        this._name = name;

        if (typeof this._data === 'undefined') {
            this.registerError(ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', this._name));

            return;
        } else if (typeof this._name === 'undefined' || typeof REQUIRED_KEYS[this.keyName] === 'undefined') {
            this.registerError(ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base'));

            return;
        }

        return;
    }

    /**
     *
     */
    validate() {
        throw new Error('BaseValidator#validate should be overwritten by the extending class');
    }

    /**
     *
     */
    validateList() {
        for (let i = 0; i < this._data.length; i++) {
            const item = this._data[i];

            this.validateSingle(item);
        }
    }

    /**
     *
     */
    validateObj() {
        for (const key in this._data) {
            const item = this._data[key];

            this.validateSingle(item);
        }
    }

    /**
     *
     * @param {object} item
     */
    validateSingle(item) {
        if (hasAllKeys(REQUIRED_KEYS[this.keyName], item)) {
            return;
        }

        const missingKeys = findMissingKeys(REQUIRED_KEYS[this.keyName], item);
        const errorMessage = this._buildMissingKeysErrorMessage(missingKeys);

        this.registerError(errorMessage);
    }

    /**
     *
     */
    registerError(errorMessage) {
        this._errors.push(errorMessage);
    }

    /**
     *
     * @param {string[]} missingKeys
     * @returns {string}
     */
    _buildMissingKeysErrorMessage(missingKeys) {
        return `${ERROR_MESSAGE.MISSING_KEYS.BASE.replace('{KEY}', this.name)}: ${missingKeys.join(', ')}`;
    }
}

module.exports = BaseValidator;
