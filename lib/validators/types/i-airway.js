const t = require('tcomb');

const IAirway = t.list(t.String, 'IAirway');

module.exports = IAirway;
