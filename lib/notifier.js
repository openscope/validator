const ora = require('ora');

const BASE_CONFIG = {
    color: 'green',
    spinner: 'bouncingBar'
};

/**
 *
 *
 */
class Notifier {
    constructor() {
        this._spinner = null;
    }

    /**
     *
     *
     */
    clear() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._inturrupt();
        this._destroyCurrentSpinner();
    }

    /**
     *
     *
     */
    fail() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._spinner.fail();
        this._destroyCurrentSpinner();
    }

    /**
     *
     *
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
     *
     *
     */
    succeed() {
        if (!this._hasSpinner || !this._spinner.isSpinning) {
            return;
        }

        this._spinner.succeed();
        this._destroyCurrentSpinner();
    }

    /**
     *
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
     *
     *
     */
    _destroyCurrentSpinner() {
        if (!this._hasSpinner()) {
            return;
        }

        this._spinner.clear();
        this._spinner = null;
    }

    /**
     *
     *
     */
    _hasSpinner() {
        return this._spinner !== null;
    }

    /**
     *
     *
     */
    _inturrupt() {
        return this._spinner.stop();
    }

    /**
     *
     *
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
