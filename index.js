const fs = require('fs');
const Notifier = require('./lib/notifier');
const parseArgs = require('./lib/parseArgs');
const validator = require('./lib/validator');

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
 * Load the airport file suppied by icao identifier with the `-a` flag
 *
 * The full file path will be built passed on the `process.cwd()` and
 * and expectation that airport files live in `/assets/airports/` from
 * the process root
 *
 * @private
 * @function _loadAirportFile
 * @param {CliOptionsType} options
 */
function _loadAirportFile(options) {
    Notifier.start(`Loading Airport file: ${options.airport}`);

    fs.readFile(options.fullPathToAirportFile, 'utf8', (err, airportJson) => {
        if (err) {
            Notifier.fail();

            throw new Error(err);
        }

        Notifier.succeed();

        validator(JSON.parse(airportJson), options);
    });
}

(function() {
    const options = parseArgs(PATHS);

    if (options.shouldExit) {
        console.log('\r\n\r\n help docs here');

        return;
    }

    Notifier.start('Parsing options');
    Notifier.succeed();

    _loadAirportFile(options);
})();
