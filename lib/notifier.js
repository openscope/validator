const ora = require('ora');

/**
 * @property BASE_CONFIG
 * @type {object}
 */
const BASE_CONFIG = {
    /**
     * @memberof BASE_CONFIG
     * @property color
     * @type {string}
     * @default green
     */
    color: 'green',
    /**
     * @memberof BASE_CONFIG
     * @property spinner
     * @type {string}
     * @default bounncingBar
     */
    spinner: 'bouncingBar'
};

/**
 * Wraps `ora` node module
 *
 * see: `https://github.com/sindresorhus/ora`
 *
 * @class Notifier
 */
class Notifier {
    /**
     * @constructor
     */
    constructor() {
        /**
         * A spinner instance
         *
         * This class supports only a single instance of a `#_spinner`
         * when a new `#_spinner` is called to start, any existing
         * `#_spinner` will first be cleared
         *
         * @private
         * @property _spinner
         * @type {ora.Spinner}
         * @default null
         */
        this._spinner = null;
    }

    /**
     * Clear an active `#_spinner`
     *
     * @public
     * @for Notifier
     * @method clear
     */
    clear() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._inturrupt();
        this._destroyCurrentSpinner();
    }

    /**
     * Calls `.fail()` on the current `#_spinner` instance
     *
     * Renders a fail state in the console
     * Destroys the current `#_spinner` instance
     *
     * @public
     * @for Notifier
     * @method fail
     */
    fail() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._spinner.fail();
        this._destroyCurrentSpinner();
    }

    /**
     * Calls `.start()` on the current `#_spinner` instance
     *
     * Creates a new `#_spinner` instance
     * Renders a start state in the console
     *
     * @public
     * @for Notifier
     * @method start
     */
    start(options) {
        if (this._hasSpinner()) {
            this._inturrupt();
            this._destroyCurrentSpinner();
        }

        const oraConfig = this._parseOptions(options);

        this._createSpinner(oraConfig);

        this._spinner.start();
    }

    /**
     * Calls `.succeed()` on the current `#_spinner` instance
     *
     * Renders a start state in the console
     * Destroys current `#_spinner` instance
     *
     * @public
     * @for Notifier
     * @method succeed
     */
    succeed() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._spinner.succeed();
        this._destroyCurrentSpinner();
    }

    /**
     * Creates a new `#_spinner` instance
     *
     * Accepts configuration that will override the `BASE_CONFIG`
     *
     * @private
     * @for Notifier
     * @method _createSpinner
     * @param {object} options
     */
    _createSpinner(options) {
        const config = {
            ...options,
            ...BASE_CONFIG
        }

        this._spinner = ora(config);
    }

    /**
     * Calls `.clear()` on the current `#_spinner` instance
     *
     * Resets the `#_spinner` property
     *
     * @public
     * @for Notifier
     * @method _destroyCurrentSpinner
     */
    _destroyCurrentSpinner() {
        if (!this._hasSpinner()) {
            return;
        }

        this._spinner.clear();
        this._spinner = null;
    }

    /**
     * Determine if there is a current `#_spinner` instance
     *
     * @private
     * @for Notifier
     * @method _hasSpinner
     * @returns {boolean`}
     */
    _hasSpinner() {
        return this._spinner !== null;
    }

    /**
     * Calls `.stop()` on the current `#_spinner` instance
     *
     * Will stop a `#_spinner` in progress
     *
     * Expects that a `#_spinner` has been verified and exists
     *
     * @private
     * @for Notifier
     * @method _inturrupt
     */
    _inturrupt() {
        return this._spinner.stop();
    }

    /**
     * Builds a config object for a new `#_spinner` instance
     *
     * @for Notifier
     * @method _parseOptions
     * @param {string|object} options
     * @returns {object}
     */
    _parseOptions(options) {
        if (typeof options !== 'string') {
            return options;
        }

        return {
            text: options
        };
    }
}

module.exports = new Notifier();
