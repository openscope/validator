const _snakeCase = require('lodash').snakeCase;
const hasAllKeys = require('../hasAllKeys');
const findMissingKeys = require('../findMissingKeys');
const REQUIRED_KEYS = require('./requiredKeys');
const ERROR_MESSAGE = require('./errorMessage');

/**
 * Iterator used to set the `#_id` property of an
 * instance of `BaseValidator`
 *
 * Value will increment only on instantiation
 *
 * @private
 * @property _id
 * @type {number}
 */
let _id = 0;

/**
 *
 *
 * @class BaseValidator
 */
class BaseValidator {

    /**
     *
     *
     * @property errors
     * @type {string[]}
     */
    get errors() {
        return this._errors;
    }

    /**
     *
     *
     * @property isValid
     * @type {boolean}
     */
    get isValid() {
        return this._errors.length === 0;
    }

    /**
     *
     *
     * @property keyName
     * @type {string}
     */
    get keyName() {
        return _snakeCase(this._name).toUpperCase();
    }

    /**
     *
     *
     * @property name
     * @type {string}
     */
    get name() {
        return this._name;
    }

    /**
     *
     *
     * @constructor
     * @param {string} name
     * @param {object} json
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
     * @public
     * @for BaseValidator
     * @param {string} errorMessage
     */
    registerError(errorMessage) {
        this._errors.push(errorMessage);
    }

    /**
     *
     *
     * @public
     * @for BaseValidator
     */
    validate() {
        throw new Error('BaseValidator#validate should be overwritten by the extending class');
    }

    /**
     *
     *
     * @public
     * @for BaseValidator
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
     *
     * @public
     * @for BaseValidator
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
     *
     * @public
     * @for BaseValidator
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
     *
     * @public
     * @for BaseValidator
     * @param {tcomb.interface} IValidatorItem
     */
    validateInterfaceDict(IValidatorItem) {
        if (!this.isValid) {
            return;
        }

        for (const key in this._data) {
            const item = this._data[key];

            this._validateInterfaceItem(IValidatorItem, item, key);
        }
    }

    /**
     *
     *
     * @public
     * @for BaseValidator
     * @param {tcomb.interface} IValidatorList
     * @param {tcomb.interface} IValidatorItem
     */
    validateInterfaceList(IValidatorList, IValidatorItem) {
        if (!this.isValid) {
            return;
        }

        for (let i = 0; i < this._data.length; i++) {
            const item = this._data[i];

            this._validateInterfaceItem(IValidatorItem, item);
        }

        this._validateInterfaceItem(IValidatorList, this._data);
    }

    /**
     *
     *
     * @public
     * @for BaseValidator
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
     *
     * @private
     * @for BaseValidator
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
     *
     * @private
     * @for BaseValidator
     * @param {string[]} missingKeys
     * @param {string} parentKey
     * @returns {string}
     */
    _buildMissingKeysErrorMessageForParent(missingKeys, parentKey) {
        return `${ERROR_MESSAGE.MISSING_KEYS.BASE.replace('{KEY}', `${this.name}\` - \`${parentKey}`)}: ${missingKeys.join(', ')}`;
    }

    /**
     *
     *
     * @private
     * @for BaseValidator
     * @returns {boolean}
     */
    _isNameOrKeyUndefined() {
        return typeof this._name === 'undefined' || typeof REQUIRED_KEYS[this.keyName] === 'undefined';
    }

    /**
     *
     *
     * @private
     * @for BaseValidator
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
     *
     * @private
     * @for BaseValidator
     * @param {tcomb.interface} IValidator
     * @param {any} item
     */
    _validateInterfaceItem(IValidator, item, key = '') {
        try {
            const validDataType = IValidator(item);
        } catch (error) {
            const errorMessage = String(error).split('[tcomb] ');

            this.registerError(errorMessage[1]);
        }
    }
}

module.exports = BaseValidator;
