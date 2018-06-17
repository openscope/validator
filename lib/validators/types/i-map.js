const t = require('tcomb');

// const MapLineSegmentType = t.refinement(t.list(t.String), (v) => v.length === 4, 'MapLineSegmentType');

const IMap = t.interface({
    base: t.list(t.list(t.String))
}, { name: 'IMap', strict: true });

module.exports = IMap;
