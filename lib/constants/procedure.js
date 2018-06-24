const INSTRUCTION_SYMBOL = {
    FLY_OVER: '^',
    HEADING: '#',
    HOLD: '@',
}

const RESTRICTION_SYMBOL = {
    ALTITUDE: 'A',
    GREATER_THAN: '+',
    LESS_THAN: '-',
    PROCEDURE_ICAO: '*',
    SEPARATOR: '|',
    SPEED: 'S',
};

const SEGMENT_NAME = {
    RWY: 'rwy',
    BODY: 'body',
    EXIT_POINTS: 'exitPoints',
    ENTRY_POINTS: 'entryPoints'
};

module.exports = {
    INSTRUCTION_SYMBOL: INSTRUCTION_SYMBOL,
    RESTRICTION_SYMBOL: RESTRICTION_SYMBOL,
    SEGMENT_NAME: SEGMENT_NAME,
};
