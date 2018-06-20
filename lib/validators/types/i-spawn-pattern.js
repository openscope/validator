const t = require('tcomb');
const IcaoType = require('./baseTypes').IcaoType;
const NumberTupleOrEmptyStringType = require('./baseTypes').NumberTupleOrEmptyStringType;

const SpawnPatternCategoryEnum = t.enums.of(['arrival', 'departure'], 'SpawnPatternCategoryEnum');
const SpawnPatternMethodEnum = t.enums.of([
    'random',
    'cyclic',
    'surge',
    'wave'
], 'SpawnPatternMethodEnum');
const ISpawnPatternAirlineEntry = t.tuple([t.String, t.Number], 'ISpawnPatternAirlineEntry');

/**
 *
    {
        "origin": "ksea",
        "destination": "",
        "category": "departure",
        "route": "KSEA16L.BANGR9.ARRIE",
        "altitude": "",
        "speed": "",
        "method": "random",
        "rate": 4,
        "airlines": [
            ["aal", 4.05],
            ["aca", 0.95]
        ]
    }
 *
 */
const IBaseSpawnPattern = t.interface({
    category: SpawnPatternCategoryEnum,
    route: t.String,
    method: SpawnPatternMethodEnum,
    rate: t.Number,
    airlines: t.list(ISpawnPatternAirlineEntry)
}, { name: 'IBaseSpawnPattern', strict: true });

const IArrivalSpawnPattern = IBaseSpawnPattern.extend({
    origin: t.Any,
    destination: IcaoType,
    altitude: NumberTupleOrEmptyStringType,
    speed: t.Number,
}, { name: 'IArrivalSpawnPattern', strict: true });

const IDepartureSpawnPattern = IBaseSpawnPattern.extend({
    origin: IcaoType,
    destination: t.Any,
    altitude: t.Any,
    speed: t.Any,
}, { name: 'IDepartureSpawnPattern', strict: true });

const ISpawnPattern = t.union([IArrivalSpawnPattern, IDepartureSpawnPattern], 'ISpawnPattern');

ISpawnPattern.dispatch = (value) => value.category === 'arrival' ? IArrivalSpawnPattern : IDepartureSpawnPattern;

const ISpawnPatternList = t.list(ISpawnPattern, 'ISpawnPatternList');

module.exports = {
    SpawnPatternCategoryEnum: SpawnPatternCategoryEnum,
    ISpawnPattern: ISpawnPattern,
    ISpawnPatternList: ISpawnPatternList
};
