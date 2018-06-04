const chalk = require('chalk');

function _hasAllKeys(keys, obj) {

}

function _hasAllKeysAndType(keyTypeDict, obj) {

}

function _radioValidator(radio) {
    console.log(chalk.yellow('::: Validating `radio`'));

    console.log(radio);
    // length 3
    // hasAll `twr`, `app`, `dep`
}

module.exports = {
    radioValidator: _radioValidator
}
