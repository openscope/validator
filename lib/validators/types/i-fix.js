const t = require('tcomb');
const StringOrNumberType = require('./common-types').StringOrNumberType;

const IFix = t.list(StringOrNumberType, 'IFix');

module.exports = IFix;
