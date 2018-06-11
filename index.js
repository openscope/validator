const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const Notifier = require('./lib/notifier');
const validator = require('./lib/validator');

const OPTIONS = {
    _fullPathToAirportFile: '',
    airport: '',
    shouldValidateFixes: false,
    shouldValidateSpawnPatterns: false
};

// -a ksea             entire airport file
// --fixes             fixes, valid position and references
// --spawn-patterns    spawnPatterns, valid fixenames and object shapes
function _parseArgs() {
    Notifier.start({ text: 'Parsing ARGS' });

    const args = minimist(process.argv.slice(2));

    if (typeof args.a !== 'undefined') {
        OPTIONS.airport = args.a;
        OPTIONS._fullPathToAirportFile = path.join(__dirname, OPTIONS.airport);
    }

    if (typeof args.shouldValidateFixes !== 'undefined') {
        OPTIONS.shouldValidateFixes = args.fixes;
    }

    if (typeof args.shouldValidateSpawnPatterns !== 'undefined') {
        OPTIONS.shouldValidateFixes = args.spawnPatterns;
    }

    Notifier.succeed();
}

function _loadAirportFile(args) {
    Notifier.start({ text: `Loading Airport file: ${OPTIONS.airport}`});

    fs.readFile(OPTIONS._fullPathToAirportFile, 'utf8', (err, airportJson) => {
        if (err) {
            Notifier.fail();

            throw new Error(err);
        }

        Notifier.succeed();

        validator(JSON.parse(airportJson), OPTIONS);
    });
}

(function() {
    _parseArgs();
    _loadAirportFile();
})();
