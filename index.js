const fs = require('fs');
const Notifier = require('./lib/notifier');
const cli = require('./lib/cli');
const cliHelp = require('./lib/cliHelp');
const validator = require('./lib/validator');

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
    const options = cli();

    if (options.shouldExit) {
        cliHelp();

        process.exit(0);

        return;
    }

    Notifier.start('Parsing options');
    Notifier.succeed();

    _loadAirportFile(options);
})();
