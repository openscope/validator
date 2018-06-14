const _snakeCase = require('lodash').snakeCase;
const hasAllKeys = require('../hasAllKeys');
const findMissingKeys = require('../findMissingKeys');
const REQUIRED_KEYS = require('./requiredKeys');
const ERROR_MESSAGE = require('./errorMessage');

let _id = 0;

class BaseValidator {

    /**
     *
     */
    get errors() {
        return this._errors;
    }

    /**
     *
     */
    get isValid() {
        return this._errors.length === 0;
    }

    /**
     *
     */
    get keyName() {
        return _snakeCase(this._name).toUpperCase();
    }

    /**
     *
     */
    get name() {
        return this._name;
    }

    /**
     *
     */
    constructor(name, json) {
        this._id = (_id)++;
        this._errors = [];
        this._data = json;
        this._name = name;

        if (typeof this._data === 'undefined') {
            this.registerError(ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', this._name));

            return;
        } else if (this._isNameOrKeyUndefined()) {
            this.registerError(ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base'));

            return;
        }

        return;
    }

    /**
     *
     *
     * @param {string} errorMessage
     */
    registerError(errorMessage) {
        this._errors.push(errorMessage);
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
        if (!this.isValid) {
            return;
        }

        for (let i = 0; i < this._data.length; i++) {
            const item = this._data[i];

            this._validateItem(item);
        }
    }

    /**
     *
     */
    validateObj() {
        if (!this.isValid) {
            return;
        }

        for (const key in this._data) {
            const item = this._data[key];

            this._validateItem(item, key);
        }
    }

    /**
     *
     * @param {object} item
     * @param {srting} parentKey
     */
    validateSingle(item) {
        if (!this.isValid) {
            return;
        }

        this._validateItem(item);
    }

    /**
     *
     * @param {tcomb.interface} IValidatorItem
     */
    validateInterfaceDict(IValidatorItem) {
        for (const key in this._data) {
            const item = this._data[key];

            this._validateInterfaceItem(IValidatorItem, item, key);
        }
    }

    /**
     *
     * @param {tcomb.interface} IValidatorList
     * @param {tcomb.interface} IValidatorItem
     */
    validateInterfaceList(IValidatorList, IValidatorItem) {
        for (let i = 0; i < this._data.length; i++) {
            const item = this._data[i];

            this._validateInterfaceItem(IValidatorItem, item);
        }

        this._validateInterfaceItem(IValidatorList, this._data);
    }

    /**
     *
     *
     * @param {tcomb.interface} IValidator
     */
    validateInterface(IValidatorItem) {
        if (!this.isValid) {
            return;
        }

        this._validateInterfaceItem(IValidatorItem, this._data);
    }

    /**
     *
     * @param {string[]} missingKeys
     * @returns {string}
     */
    _buildMissingKeysErrorMessage(missingKeys, parentKey = '') {
        if (parentKey !== '') {
            return this._buildMissingKeysErrorMessageForParent(missingKeys, parentKey);
        }

        return `${ERROR_MESSAGE.MISSING_KEYS.BASE.replace('{KEY}', this.name)}: ${missingKeys.join(', ')}`;
    }

    /**
     *
     * @param {string[]} missingKeys
     * @param {string} parentKey
     */
    _buildMissingKeysErrorMessageForParent(missingKeys, parentKey) {
        return `${ERROR_MESSAGE.MISSING_KEYS.BASE.replace('{KEY}', `${this.name}\` - \`${parentKey}`)}: ${missingKeys.join(', ')}`;
    }

    /**
     *
     *
     */
    _isNameOrKeyUndefined() {
        return typeof this._name === 'undefined' || typeof REQUIRED_KEYS[this.keyName] === 'undefined';
    }

    /**
     *
     * @param {object} item
     * @param {string[]} parentKey
     */
    _validateItem(item, parentKey = '') {
        if (hasAllKeys(REQUIRED_KEYS[this.keyName], item)) {
            return;
        }

        const missingKeys = findMissingKeys(REQUIRED_KEYS[this.keyName], item);
        const errorMessage = this._buildMissingKeysErrorMessage(missingKeys, parentKey);

        this.registerError(errorMessage);
    }

    /**
     *
     * @param {tcomb.interface} IValidator
     * @param {any} item
     */
    _validateInterfaceItem(IValidator, item, key = '') {
        try {
            const validDataType = new IValidator(item);
        } catch (error) {
            const errorMessage = String(error).split('[tcomb] ');

            this.registerError(errorMessage[1]);
        }
    }
}

module.exports = BaseValidator;
