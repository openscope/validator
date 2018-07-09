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
function _loadAirportFile(options, airlineJson) {
    Notifier.start(`Loading Airport file: ${options.airport}`);

    fs.readFile(options.pathToAirportFile, 'utf8', (err, airportJson) => {
        if (err) {
            Notifier.fail();

            throw new Error(err);
        }

        Notifier.succeed();

        validator(options, JSON.parse(airportJson), airlineJson);
    });
}

/**
 * Load the airlines file
 *
 * The file we're looking for here is the single `airlines.json` file that is generated
 * on build in the Openscope project.
 *
 * It is assumed that this file live at:
 * - `/public/assets/airlines/airlines.json`
 *
 * @private
 * @function _loadAirlinesAndAirportFiles
 * @param {CliOptionsType} options
 */
function _loadAirlinesAndAirportFiles(options) {
    Notifier.start(`Loading Airlines file`);

    fs.readFile(options.pathToAirlineFile, 'utf8', (err, airlineJson) => {
        if (err) {
            Notifier.fail();

            throw new Error(err);
        }

        Notifier.succeed();

        _loadAirportFile(options, JSON.parse(airlineJson).airlines);
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

    _loadAirlinesAndAirportFiles(options);
})();
