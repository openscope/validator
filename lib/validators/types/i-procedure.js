const t = require('tcomb');


const RESTRICTION_SYMBOL = {
    ALTITUDE: 'A',
    FLY_OVER: '^',
    HEADING: '#',
    HOLD: '@',
    GREATER_THAN: '+',
    LESS_THAN: '-',
    PROCEDURE_ICAO: '*',
    SEPARATOR: '|',
    SPEED: 'S',
    RNAV: '_',
};

const IWaypointWithRestriction = t.tuple([t.String, t.String], 'IWaypointWithRestriction');

const IProcedureSegmentWaypoint = t.union([
    t.String,
    IWaypointWithRestriction
], 'IProcedureSegmentWaypoint');

const IProcedureSegmentWaypointList = t.list(IProcedureSegmentWaypoint, 'IProcedureSegmentWaypoint');

IProcedureSegmentWaypoint.dispatch = function (v) {
    if (typeof v === 'string') {
        return t.String;
    }

    return IWaypointWithRestriction;
};

const IProcedureSegment = t.dict(t.String, t.Any, 'IProcedureSegment');

const IProcedure = t.interface({
    icao: t.String,
    name: t.String,
    body: IProcedureSegmentWaypointList,
    draw: t.list(t.list(t.String)),
    rwy: IProcedureSegment
}, { name: 'IProcedure', strict: true });

const ISidProcedure = IProcedure.extend({
    exitPoints: IProcedureSegment
}, { name: 'ISidProcedure', strict: false });

const IStarProcedure = IProcedure.extend({
    entryPoints: IProcedureSegment
}, { name: 'IStarProcedure', strict: false });

module.exports ={
    IProcedure: IProcedure,
    ISidProcedure: ISidProcedure,
    IStarProcedure: IStarProcedure
};
