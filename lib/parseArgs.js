const path = require('path');
const minimist = require('minimist');
const Notifier = require('./notifier');

const OPTIONS = {
    fullPathToAirportFile: '',
    airport: '',
    shouldExit: false,
    shouldValidateFixes: false,
    shouldValidateSpawnPatterns: false
};

/**
 *
 * @param {object} args
 * @param {string|undefined} argKey
 */
function _hasArg(args, argKey) {
    return args && typeof args[argKey] !== 'undefined';
}

/**
 *
 * @param {object} args
 */
function _hasExitableArg(args) {
    return !_hasArg(args, 'a') ||
        _hasArg(args, 'h');
}

// -a ksea             airport icao                                         (required)
// -h
// --fixes             fixes, valid position and references
// --spawn-patterns    spawnPatterns, valid fixenames and object shapes
function parseArgs() {
    const args = minimist(process.argv.slice(2));

    if (_hasArg(args, 'a')) {
        OPTIONS.airport = args.a;
        OPTIONS.fullPathToAirportFile = path.join(process.cwd(), OPTIONS.airport);
    }

    if (_hasArg(args, 'shouldValidateFixes')) {
        OPTIONS.shouldValidateFixes = args.fixes;
    }

    if (_hasArg(args, 'shouldValidateSpawnPatterns')) {
        OPTIONS.shouldValidateFixes = args.spawnPatterns;
    }

    if (_hasExitableArg(args)) {
        OPTIONS.shouldExit = true;
    }

    return OPTIONS;
}

module.exports = parseArgs;
