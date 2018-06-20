const t = require('tcomb');
const _ = require('lodash');

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

function _hasAltitudeOrSpeedPrefix(str) {
    return _.startsWith(str, RESTRICTION_SYMBOL.ALTITUDE) ||
        _.startsWith(str, RESTRICTION_SYMBOL.SPEED);
}

function isValidWapointRestriction(str) {
    const restrictionSegments = str.split(RESTRICTION_SYMBOL.SEPARATOR);

    if (restrictionSegments.length === 1) {
        return _hasAltitudeOrSpeedPrefix(restrictionSegments[0]);
    }

    for (let i = 0; i < restrictionSegments.length; i++) {
        const restriction = restrictionSegments[i];

        if (!_hasAltitudeOrSpeedPrefix(restriction)) {
            return false;
        }
    }

    return true;
}

const WaypointRestrictionType = t.refinement(t.String, (v) => isValidWapointRestriction(v), 'WaypointRestrictionType');

const IWaypointWithRestriction = t.tuple([t.String, WaypointRestrictionType], 'IWaypointWithRestriction');

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

module.exports = {
    WaypointRestrictionType: WaypointRestrictionType,
    IProcedure: IProcedure,
    ISidProcedure: ISidProcedure,
    IStarProcedure: IStarProcedure
};
