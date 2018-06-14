const fs = require('fs');
const Notifier = require('./lib/notifier');
const parseArgs = require('./lib/parseArgs');
const validator = require('./lib/validator');

/**
 *
 * @param {object} options
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
    const options = parseArgs();

    if (options.shouldExit) {
        console.log('\r\n\r\n help docs here');

        return;
    }

    Notifier.start('Gathering options');
    Notifier.succeed();

    _loadAirportFile(options);
})();
