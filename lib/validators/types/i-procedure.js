const t = require('tcomb');
const _ = require('lodash');
const PROCEDURE = require('../../constants/procedure');

function _hasAltitudeOrSpeedPrefix(str) {
    return _.startsWith(str, PROCEDURE.RESTRICTION_SYMBOL.ALTITUDE) ||
        _.startsWith(str, PROCEDURE.RESTRICTION_SYMBOL.SPEED);
}

function isValidWapointRestriction(str) {
    const restrictionSegments = str.split(PROCEDURE.RESTRICTION_SYMBOL.SEPARATOR);

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

IProcedureSegmentWaypoint.dispatch = function dispatch(v) {
    if (t.String.is(v)) {
        return t.String;
    }

    return IWaypointWithRestriction;
};

const IProcedureSegmentWaypointList = t.list(IProcedureSegmentWaypoint, 'IProcedureSegmentWaypoint');
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
    IProcedureSegmentWaypoint: IProcedureSegmentWaypoint,
    IProcedureSegmentWaypointList: IProcedureSegmentWaypointList,
    IProcedure: IProcedure,
    ISidProcedure: ISidProcedure,
    IStarProcedure: IStarProcedure
};
