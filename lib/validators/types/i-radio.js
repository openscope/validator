const t = require('tcomb');

const IRadio = t.interface({
    app: t.String,
    dep: t.String,
    twr: t.String
}, { name: 'IRadio', strict: true });

module.exports = IRadio;
