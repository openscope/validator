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
 * @default 0
 */
let _id = 0;

/**
 * A validator is class concerned with a specific section of an `airport` definition.
 * This class provides properties and methods from which a validiator can inherit.
 *
 * This class is meant to be inherited (extended) by some other validator and provides
 * central methods that _all_ validator classes are able to call.
 *
 * An extending class should:
 * - provide a definition for `.validate()`, `BaseValidator.validate()`
 *   will throw if called directly
 * - call the appropriate `.validate()` method based on the type of `#_data`
 * - call the appropriate `.validateInterface()` method based on the interface defined for `#_data`
 *
 * @class BaseValidator
 */
class BaseValidator {

    /**
     * An array of found errors
     *
     * Is used after validation to render error messages. Though this property
     * is defined here in `BaseValidator`, an extending class will be concerned
     * with calling the appropriate methods to generate any errors.
     *
     * @property errors
     * @type {string[]}
     */
    get errors() {
        return this._errors;
    }

    /**
     * Boolean encapsulation used to determine if a particular validator is
     * valid or not
     *
     * Valid is defined as having no errors, so this state can change based
     * on what parts of validation have run and what parts have not yet run
     *
     * @property isValid
     * @type {boolean}
     */
    get isValid() {
        return this._errors.length === 0;
    }

    /**
     * Given a `#_name`, this provides a way to get the correct object
     * key defined within `REQUIRED_KEYS`
     *
     * @property keyName
     * @type {string}
     */
    get keyName() {
        return _snakeCase(this._name).toUpperCase();
    }

    /**
     * Name of the validator
     *
     * This will be set by the extending class
     *
     * @property name
     * @type {string}
     */
    get name() {
        return this._name;
    }

    /**
     * @constructor
     * @param {string} name  Name of an extending class. the CONSTANT_CASE version of `#_name`
     *                       is used in `REQUIRED_KEYS`
     * @param {object} json  data from an airport definition file. an extending class should be
     *                       concerned with only a single section of an airport definition
     */
    constructor(name, json) {
        /**
         * unique identifier of an extending class
         *
         * provides an easy way to differentiate each extending class
         * and should be used only for debugging purposes
         *
         * will auto-increment for every instantiation
         *
         * @private
         * @property _id
         * @type {number}
         */
        this._id = (_id)++;

        // TODO: type this property
        /**
         * list of error messages generated during `.validate()` operations
         *
         * when adding new error messages, only the `.registerErrors()`
         * method should be used
         *
         * `#_errors` should never be mutated outside of the
         * `.registerErrors()` method
         *
         * @private
         * @property _errors
         * @type {string[]}
         * @default
         */
        this._errors = [];

        /**
         * raw data from the airport definition under validation
         *
         * will likely be only a subset of an airport definition
         *
         * should not be mutated and should be considered readonly
         *
         * @private
         * @property _data
         * @type {object}
         * @default json
         */
        this._data = json;

        /**
         * name of an extending class
         *
         * should map directly to the subset of an airport defintion
         *
         * example:
         * - if `#_name` is passed as `radio`
         * - the class should be concerned with only
         *
         * ```json
            "radio": {
                "twr": "Seatle Tower",
                "app": "Seattle Approach",
                "dep": "Seattle Departure"
            }
         * ```
         *
         * @private
         * @property _name
         * @type {string}
         * @default name
         */
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
     * Single method used to add a new `errorMessage` to the `#_errors` list
     *
     * @public
     * @for BaseValidator
     * @method registerError
     * @param {string} errorMessage
     */
    registerError(errorMessage) {
        this._errors.push(errorMessage);
    }

    /**
     * Entry point to all other validation methods
     *
     * This single method is called on each validator within a `for` loop.
     * Any validation for a specific validator should be called within
     * this method in an extending class
     *
     * At minimum, this method should call one of:
     * `.validateList()`, `.validateObj()` or `.validateSingle()`
     *
     * and also one of:
     * `.validateInterfaceDict()`, `.validateInterfaceList()` or `.validateInterface()`
     *
     * @public
     * @for BaseValidator
     * @method validate
     */
    validate() {
        throw new Error('BaseValidator#validate should be overwritten by the extending class');
    }

    /**
     * should be called by an extending class when `#_data` is an array
     *
     * this should be called only within an extending class
     * definition for `.validate()`
     *
     * @public
     * @for BaseValidator
     * @method validateList
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
     * should be called by an extending class when `#_data` is
     * an object of objects
     *
     * this should be called only within an extending class
     * definition for `.validate()`
     *
     * @public
     * @for BaseValidator
     * @method validateObj
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
     * should be called by an extending class when `#_data` is a simple object
     *
     * this should be called only within an extending class
     * definition for `.validate()`
     *
     * @public
     * @for BaseValidator
     * @method validateSingle
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
     * @method validateInterfaceDict
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
     * @method validateInterfaceList
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
     * @method validateInterface
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
     * @method _buildMissingKeysErrorMessage
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
     * @method _buildMissingKeysErrorMessageForParent
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
     * @method _isNameOrKeyUndefined
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
     * @method _validateItem
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
     * @method _validateInterfaceItem
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
