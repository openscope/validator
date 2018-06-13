const t = require('tcomb');
const TwoElementStringOrNumberTypeList = require('./baseTypes').TwoElementStringOrNumberTypeList;

const AirspaceClassEnum = t.enums.of(['A', 'B', 'C', 'D', 'E', 'F', 'G'], 'AirspaceClassEnum');

const IAirspace = t.struct({
    floor: t.Number,
    ceiling: t.Number,
    airspace_class: AirspaceClassEnum,
    poly: t.list(TwoElementStringOrNumberTypeList)
}, { name: 'IAirspace', strict: true });

const IAirspaceList = t.list(IAirspace, 'IAirspace');

module.exports = {
    IAirspace: IAirspace,
    IAirspaceList: IAirspaceList,
};
