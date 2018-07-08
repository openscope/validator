const t = require('tcomb');
const LatLongType = require('./lat-long-type').LatLongType;

const AirspaceClassEnum = t.enums.of(['A', 'B', 'C', 'D', 'E', 'F', 'G'], 'AirspaceClassEnum');

const IAirspace = t.struct({
    floor: t.Number,
    ceiling: t.Number,
    airspace_class: AirspaceClassEnum,
    poly: t.list(LatLongType)
}, { name: 'IAirspace', strict: true });

const IAirspaceList = t.list(IAirspace, 'IAirspace');

module.exports = {
    IAirspace: IAirspace,
    IAirspaceList: IAirspaceList,
};
