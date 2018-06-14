const t = require('tcomb');

const IFix = t.list(t.String, 'IFix');

module.exports = IFix;
