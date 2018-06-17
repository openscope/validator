const t = require('tcomb');

const CliOptionsType = t.struct({
    fullPathToAirportFile: t.String,
    airport: t.String,
    shouldExit: t.Boolean,
    shouldValidateFixes: t.Boolean,
    shouldValidateSpawnPatterns: t.Boolean
}, 'CliOptionsType');

module.exports = CliOptionsType;
