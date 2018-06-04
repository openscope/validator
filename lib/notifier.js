const ora = require('ora');

const BASE_CONFIG = {
    color: 'green',
    spinner: 'bouncingBar'
};

function Notifier() {
    this._spinner = null;
}

Notifier.prototype.start = function start(options) {
    if (this._hasSpinner()) {
        this._inturrupt();
        this._clearCurrentSpinner();
    }

    this._createSpinner(options);

    this._spinner.start();
};

Notifier.prototype.fail = function fail() {
    if (!this._hasSpinner || !this._spinner.isSpinning) {
        return;
    }

    this._spinner.fail();
    this._clearCurrentSpinner();
};

Notifier.prototype.succeed = function succeed() {
    if (!this._hasSpinner || !this._spinner.isSpinning) {
        return;
    }

    this._spinner.succeed();
    this._clearCurrentSpinner();
};

Notifier.prototype._clearCurrentSpinner = function _clearCurrentSpinner() {
    if (!this._hasSpinner()) {
        return;
    }

    this._spinner = null;
};

Notifier.prototype._createSpinner = function _createSpinner(options) {
    const config = {
        ...options,
        ...BASE_CONFIG
    };

    this._spinner = ora(config);
};

Notifier.prototype._hasSpinner = function _hasSpinner() {
    return this._spinner !== null;
};

Notifier.prototype._inturrupt = function _inturrupt() {
    return this._spinner.stop();
};

module.exports = new Notifier();
