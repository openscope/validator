const t = require('tcomb');
const TwoElementStringOrNumberTypeList = require('./baseTypes').TwoElementStringOrNumberTypeList;
const ThreeElementStringOrNumberTypeList = require('./baseTypes').ThreeElementStringOrNumberTypeList;

/**
 *
    {
        "name": ["16L", "34R"],
        "end": [
            [47.463767, -122.307749, "432.5ft"],
            [47.431201, -122.308035, "346.8ft"]
        ],
        "ils": [true, true],
        "glideslope": [3.00, 2.75]
    }
 */
const IRunway = t.interface({
    name: TwoElementStringOrNumberTypeList,
    end: t.list(ThreeElementStringOrNumberTypeList),
    ils: t.tuple([t.Boolean, t.Boolean]),
    glideslope: t.tuple([t.Number, t.Number])
}, { name: 'IRunway', strict: true });

const IRunwayList = t.list(IRunway, 'IRunwayList');

module.exports = {
    IRunway: IRunway,
    IRunwayList: IRunwayList
};
