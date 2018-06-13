const t = require('tcomb');

const IWind = t.interface({
    angle: t.Number,
    speed: t.Number
}, { name: 'IWind', strict: true });

module.exports = IWind;
