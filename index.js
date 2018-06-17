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
    AIRPORT_DIR: './assets/airports',
    AIRCRAFT: './public/assets/aircraft/aircraft.json',
    AIRLINES: './public/assets/airlines/airlines.json'
};

/**
 *
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

    Notifier.start('Gathering options');
    Notifier.succeed();

    _loadAirportFile(options);
})();
