const path = require('path');
const minimist = require('minimist');
const CliOptionsType = require('./types/cliOptionsType');

/**
 * References to files and paths that can be used elsewhere in the app
 *
 * @constant
 * @property PATHS
 */
const PATHS = {
    /**
     * Path to airport files
     *
     * This follows the existing `Openscope` folder structure convention(s)
     *
     * @memberOf PATHS
     * @property AIRPORT_DIR
     * @type {string}
     */
    AIRPORT_DIR: './assets/airports',

    /**
     * Path to the _complied_ `aircraft.json`
     *
     * It's important we reference the compiled file
     *
     * @memberOf PATHS
     * @property AIRCRAFT
     * @type {string}
     */
    AIRCRAFT: './public/assets/aircraft/aircraft.json',

    /**
     * Path to the _complied_ `airlines.json`
     *
     * It's important we reference the compiled file
     *
     * @memberOf PATHS
     * @property AIRLINES
     * @type {string}
     */
    AIRLINES: './public/assets/airlines/airlines.json'
};

/**
 * Options available to the validator
 *
 * Some options will be set via cli flags, others
 * will be evaluated at run time based on current args
 *
 * @constant OPTIONS
 */
const OPTIONS = {
    /**
     * @memberOf OPTIONS
     * @property fullPathToAirportFile
     */
    fullPathToAirportFile: '',

    /**
     * @memberOf OPTIONS
     * @property airport
     * @type {string}
     */
    airport: '',

    /**
     * Flag used to determine if validation should exit early
     *
     * Passing `-h` or _not_ passing `-a` are the only ways
     * currently to trigger an exit
     *
     * @memberOf OPTIONS
     * @property shouldExit
     * @type {boolean}
     */
    shouldExit: false,

    // FIXME: NOT IN IMPLEMENTED
    /**
     *
     * @memberOf OPTIONS
     * @property shouldValidateFixes
     * @type {boolean}
     */
    shouldValidateFixes: false,

    // FIXME: NOT IN IMPLEMENTED
    /**
     *
     * @memberOf OPTIONS
     * @property shouldValidateSpawnPatterns
     * @type {boolean}
     */
    shouldValidateSpawnPatterns: false
};

/**
 * Boolean abstraction used to determine if a specific argument
 * is present in the `args` object
 *
 * @private
 * @param {minimist.ParsedArgs} args
 * @param {string|undefined} argKey
 * @returns {boolean}
 */
function _hasArg(args, argKey) {
    return args && typeof args[argKey] !== 'undefined';
}

/**
 * Boolean abstraction used to determine if an aragument exists
 * and should cause validation to exit early
 *
 * @private
 * @function _hasExitableArg
 * @param {minimist.ParsedArgs} args
 * @returns {boolean}
 */
function _hasExitableArg(args) {
    return !_hasArg(args, 'a') || _hasArg(args, 'h');
}

/**
 * Parse cli arguments and add passed options to `OPTIONS` const
 *
 * options:
 * -a                   (required) airport icao
 * -h                   help
 * --fixes              fixes, valid position and references
 * --spawn-patterns     spawnPatterns, valid fixenames and object shapes
 *
 * @function cli
 * @returns {CliOptionsType} cliOptionsType
 */
function cli() {
    const args = minimist(process.argv.slice(2));

    if (_hasArg(args, 'a')) {
        const localPathToAirportFile = path.join(PATHS.AIRPORT_DIR, `${args.a}.json`);
        OPTIONS.airport = args.a;
        OPTIONS.fullPathToAirportFile = path.join(process.cwd(), localPathToAirportFile);
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

    return new CliOptionsType(OPTIONS);
}

module.exports = cli;
