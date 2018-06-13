const t = require('tcomb');
const TwoElementStringOrNumberTypeList = require('./baseTypes').TwoElementStringOrNumberTypeList;

const IRestricted = t.interface({
    name: t.String,
    height: t.String,
    coordinates: t.list(TwoElementStringOrNumberTypeList)
}, { name: 'IRestricted', strict: true });

const IRestrictedList = t.list(IRestricted, 'IRestrictedList');

module.exports = {
    IRestricted: IRestricted,
    IRestrictedList: IRestrictedList
};
