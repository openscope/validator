const t = require('tcomb');
const ElevationType = require('./lat-long-type').ElevationType;
const LatLongType = require('./lat-long-type').LatLongType;

const IRestricted = t.interface({
    name: t.String,
    height: ElevationType,
    coordinates: t.list(LatLongType)
}, { name: 'IRestricted', strict: true });

const IRestrictedList = t.list(IRestricted, 'IRestrictedList');

module.exports = {
    IRestricted: IRestricted,
    IRestrictedList: IRestrictedList
};
