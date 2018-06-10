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

    get keyName() {
        return this._name.toUpperCase();
    }

    get isList() {
        return Array.isArray(this._data);
    }

    constructor(name, json) {
        this._id = (_id)++;
        this._errors = [];
        this._data = json;
        this._name = name;
        this._requiredKeys =  REQUIRED_KEYS[this.keyName];

        if (typeof this._data === 'undefined') {
            this.registerError(ERROR_MESSAGE.UNDEFINED[this.keyName]);

            return;
        } else if (typeof this._requiredKeys === 'undefined') {
            this.registerError(ERROR_MESSAGE.UNDEFINED.BASE);

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
        if (hasAllKeys(this._requiredKeys, item)) {
            return;
        }

        const missingKeys = findMissingKeys(this._requiredKeys, item);
        const errorMessage = `${ERROR_MESSAGE.MISSING_KEYS[this.keyName]}: ${missingKeys.join(', ')}`;

        this.registerError(errorMessage);
    }
}

module.exports = BaseValidator;
