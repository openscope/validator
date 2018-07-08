const t = require('tcomb');
const LatitudeType = require('./lat-long-type').LatitudeType;
const LongitudeType = require('./lat-long-type').LongitudeType;

/**
 * Defines start/end Latitude/Longitude coordinates
 *
 * format:
 * - `[startLatitude, startLongitude, endLatitude, endLongitude]`
 *
 * example:
 * - `["N47.46706920", "W122.43465440", "N47.46816390", "W122.43651330"]`
 *
 * @type MapLineSegmentType
 */
const MapLineSegmentType = t.refinement(t.list(t.String), (v) => {
    if (v.length !== 4) {
        return false;
    }

    const startLatitude = v[0];
    const startLongitude = v[1];
    const endLatitude = v[2];
    const endLongitude = v[3];

    return LatitudeType.is(startLatitude) &&
        LongitudeType.is(startLongitude) &&
        LatitudeType.is(endLatitude) &&
        LongitudeType.is(endLongitude);
}, 'MapLineSegmentType');

const IMap = t.interface({
    base: t.list(MapLineSegmentType)
}, { name: 'IMap', strict: true });

module.exports = IMap;
