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

    get isList() {
        return Array.isArray(this._data);
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
        if (this.isList) {
            this._validateList();

            return;
        }

        this._validateSingle(this._data);
    }

    /**
     *
     */
    registerError(errorMessage) {
        this._errors.push(errorMessage);
    }

    /**
     *
     */
    _validateList() {
        for (let i = 0; i < this._data.length; i++) {
            const item = this._data[i];

            this._validateSingle(item);
        }
    }

    /**
     *
     * @param {object} item
     */
    _validateSingle(item) {
        if (hasAllKeys(REQUIRED_KEYS[this.keyName], item)) {
            return;
        }

        const missingKeys = findMissingKeys(REQUIRED_KEYS[this.keyName], item);
        const errorMessage = `${ERROR_MESSAGE.MISSING_KEYS[this.keyName]}: ${missingKeys.join(', ')}`;

        this.registerError(errorMessage);
    }
}

module.exports = BaseValidator;
