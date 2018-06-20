const t = require('tcomb');

const ProcedureRouteType = t.refinement(t.String, (v) => {
    if (!t.String.is(v)) {
        return false;
    }

    const strParts = v.split('.');

    if (strParts.length !== 3) {
        return false;
    }
});

module.exports = ProcedureRouteType;
