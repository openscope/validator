const _ = require('lodash');
const PROCEDURE = require('./constants/procedure');

/**
 * @function findUndefinedFixesInAirway
 * @param {IFixList} fixList
 * @returns {IFixList} undefinedFixes
 */
function findUndefinedFixesInAirway(airwaySegment, fixList) {
    const airway = _extractFixnamesFromSegment(airwaySegment);
    const undefinedFixes = _findUndefinedFixesInUniqueFixnames(airway, fixList);

    return undefinedFixes;
}

/**
 *
 * @function findUndefinedFixesInProcedure
 * @param {IcaoType} procedureIcao
 * @param {IProcedure} procedure
 * @param {IFixList} fixList
 * @return {IFixList} undefinedFixes
 */
function findUndefinedFixesInProcedure(procedure, fixList) {
    const rwys = _extractSegmentFromProcedure(PROCEDURE.SEGMENT_NAME.RWY, procedure);
    const body = _extractSegmentFromProcedure(PROCEDURE.SEGMENT_NAME.BODY, procedure);
    const exit = _extractSegmentFromProcedure(PROCEDURE.SEGMENT_NAME.EXIT_POINTS, procedure);
    const uniqueFixnames = _.uniq([
        ...rwys,
        ...body,
        ...exit
    ]);

    const uniqueFixnamesWithoutHoldFixes = _removeHeadingFixesFromFixList(uniqueFixnames);
    const undefinedFixes = _findUndefinedFixesInUniqueFixnames(uniqueFixnamesWithoutHoldFixes, fixList);

    return undefinedFixes;
}

function _extractSegmentFromProcedure(segmentName, procedure) {
    let fixNames = [];
    const segment = procedure[segmentName];

    if (segmentName === PROCEDURE.SEGMENT_NAME.BODY) {
        return _extractFixnamesFromSegment(segment)
    }

    for (let key in segment) {
        const fixNamesForSegment = _extractFixnamesFromSegment(segment[key]);

        fixNames.push(...fixNamesForSegment);
    }

    return fixNames;
}

function _extractFixnamesFromSegment(segmentFixlist) {
    const fixNames = [];

    for (let i = 0; i < segmentFixlist.length; i++) {
        const waypoint = segmentFixlist[i];

        if (Array.isArray(waypoint)) {
            fixNames.push(waypoint[0]);

            continue;
        }

        fixNames.push(waypoint);
    }

    return fixNames;
}

function _extractFixnameFromFixnameWithInstructionWaypoint(fixnameWithInstruction) {
    for (let instruction in PROCEDURE.INSTRUCTION_SYMBOL) {
        if (instruction === fixnameWithInstruction[0]) {
            continue;
        }

        return fixnameWithInstruction.slice(1);
    }
}

function _findUndefinedFixesInUniqueFixnames(uniqueFixnames, fixList) {
    const undefinedFixes = [];

    for (let i = 0; i < uniqueFixnames.length; i++) {
        let fixToVerify = uniqueFixnames[i];

        if (_isFixnameWithInstruction(fixToVerify)) {
            fixToVerify = _extractFixnameFromFixnameWithInstructionWaypoint(fixToVerify);
        }

        if (_isDefinedFixname(fixToVerify, fixList)) {
            continue;
        }

        undefinedFixes.push(fixToVerify);
    }

    return undefinedFixes;
}

function _isDefinedFixname(fixname, fixList) {
    return fixList.indexOf(fixname) !== -1;
}

function _isFixnameWithInstruction(fixname) {
    const instructionSymbolList = _.values(PROCEDURE.INSTRUCTION_SYMBOL);

    return instructionSymbolList.indexOf(fixname[0]) !== -1;
}

function _isHeadingInstruction(fixname) {
    return fixname[0] === PROCEDURE.INSTRUCTION_SYMBOL.HEADING;
}

function _removeHeadingFixesFromFixList(uniqueFixnames) {
    let fixListWithoutHeadingFixes = [];

    for (let i = 0; i < uniqueFixnames.length; i++) {
        const fix = uniqueFixnames[i];

        if (_isHeadingInstruction(fix)) {
            continue
        }

        fixListWithoutHeadingFixes.push(fix);
    }

    return fixListWithoutHeadingFixes;
}

module.exports = {
    findUndefinedFixesInAirway: findUndefinedFixesInAirway,
    findUndefinedFixesInProcedure: findUndefinedFixesInProcedure
};
