const _ = require('lodash');
const ValidatorAbstract = require('./ValidatorAbstract');
const ISidProcedure = require('./types/i-procedure').ISidProcedure;
const MessageType = require('./types/message-type').MessageType;
const ERROR = require('./errorMessage');

const INSTRUCTION_SYMBOL = {
    FLY_OVER: '^',
    HEADING: '#',
    HOLD: '@',
}

const SEGMENT_NAME = {
    RWY: 'rwy',
    BODY: 'body',
    EXIT_POINTS: 'exitPoints',
    ENTRY_POINTS: 'entryPoints'
};

class SidsValidator extends ValidatorAbstract {
    constructor(json, fixList) {
        super('sids', json);

        if (!fixList) {
            return;
        }

        this._fixList = Object.keys(fixList);
    }

    registerError(errorMessage) {
        super.registerError(errorMessage);
    }

    validate() {
        this.validateObj();
        this.validateInterfaceObj();
        this.validatePatternFixes();
    }

    validateObj() {
        super.validateObj();
    }

    validateInterfaceObj() {
        super.validateInterfaceObj(ISidProcedure);
    }

    validatePatternFixes() {
        if (this._fixList.length === 0 || !this.isValid) {
            return this;
        }

        for (let procedureIcao in this._data) {
            const rwys = this._extractSegmentFromProcedure(SEGMENT_NAME.RWY, procedureIcao);
            const body = this._extractSegmentFromProcedure(SEGMENT_NAME.BODY, procedureIcao);
            const exit = this._extractSegmentFromProcedure(SEGMENT_NAME.EXIT_POINTS, procedureIcao);
            const uniqueFixnames = _.uniq([
                ...rwys,
                ...body,
                ...exit
            ]);

            const uniqueFixnamesWithoutHoldFixes = this._removeHeadingFixesFromFixList(uniqueFixnames);
            const undefinedFixes = this._findUndefinedFixesInUniqueFixnames(uniqueFixnamesWithoutHoldFixes);

            if (undefinedFixes.length === 0) {
                continue;
            }

            const errorMessageStr = `${ERROR.PROCEDURE.UNDEFINED_FIX.BASE_MESSAGE} SID - ${procedureIcao}: ${undefinedFixes.join(', ')}`;
            const errorMessage = new MessageType({
                message: errorMessageStr,
                level: ERROR.PROCEDURE.UNDEFINED_FIX.LEVEL
            });

            this.registerError(errorMessage);
        }
    }

    _extractSegmentFromProcedure(segmentName, procedureIcao) {
        let fixNames = [];
        const segment = this._data[procedureIcao][segmentName];

        if (segmentName === SEGMENT_NAME.BODY) {
            return this._extractFixnamesFromSegment(segment)
        }

        for (let key in segment) {
            const fixNamesForSegment = this._extractFixnamesFromSegment(segment[key]);

            fixNames.push(...fixNamesForSegment);
        }

        return fixNames;
    }

    _extractFixnamesFromSegment(segmentFixlist) {
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

    _extractFixnameFromFixnameWithInstructionWaypoint(fixnameWithInstruction) {
        for (let instruction in INSTRUCTION_SYMBOL) {
            if (instruction === fixnameWithInstruction[0]) {
                continue;
            }

            return fixnameWithInstruction.slice(1);
        }
    }

    _findUndefinedFixesInUniqueFixnames(uniqueFixnames) {
        const undefinedFixes = [];

        for (let i = 0; i < uniqueFixnames.length; i++) {
            let fixToVerify = uniqueFixnames[i];

            if (this._isFixnameWithInstruction(fixToVerify)) {
                fixToVerify = this._extractFixnameFromFixnameWithInstructionWaypoint(fixToVerify);
            }

            if (this._isDefinedFixname(fixToVerify)) {
                continue;
            }

            undefinedFixes.push(fixToVerify);
        }

        return undefinedFixes;
    }

    _isFixnameWithInstruction(fixname) {
        const instructionSymbolList = _.values(INSTRUCTION_SYMBOL);

        return instructionSymbolList.indexOf(fixname[0]) !== -1;
    }

    _isDefinedFixname(fixname) {
        return this._fixList.indexOf(fixname) !== -1;
    }

    _isHeadingInstruction(fixname) {
        return fixname[0] === INSTRUCTION_SYMBOL.HEADING;
    }

    _removeHeadingFixesFromFixList(uniqueFixnames) {
        let fixListWithoutHeadingFixes = [];

        for (let i = 0; i < uniqueFixnames.length; i++) {
            const fix = uniqueFixnames[i];

            if (this._isHeadingInstruction(fix)) {
                continue
            }

            fixListWithoutHeadingFixes.push(fix);
        }

        return fixListWithoutHeadingFixes;
    }
}

module.exports = SidsValidator;
