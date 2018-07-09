const t = require('tcomb');

const CliOptionsType = t.struct({
    airport: t.String,
    pathToAirportFile: t.String,
    pathToAirlineFile: t.maybe(t.String),
    shouldExit: t.Boolean,
    shouldValidateFixes: t.Boolean,
    shouldValidateSpawnPatterns: t.Boolean
}, 'CliOptionsType');

module.exports = CliOptionsType;
