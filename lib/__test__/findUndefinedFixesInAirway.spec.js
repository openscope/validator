
'use strict'

const expect = require('chai').expect;
const findUndefinedFixesInAirway = require('../findUndefinedFixesInProcedure').findUndefinedFixesInAirway;
// FIXME: move this file up
const airportKseaMock = require('../validators/__test__/_mock/airportKseaMock');

const airwayWithUndefinedFixMock = {
    "J70": ["HQM", "ELMAA", "SEA", "$TEXAS", "NORMY", "BLUIT", "EPH", "MLP", "THREVE"],
    "J523": ["TOU", "ARRIE", "SEA", "WANTA", "LTJ", "IMB"]
};

describe('.findUndefinedFixesInAirway()', () => {
    const airwayIcaoMock = 'J70';
    const fixListMock = Object.keys(airportKseaMock.fixes);

    it('should accept pocedureIco, procedure and fixList as args', () => {
        const expectedResult = ['$TEXAS', 'THREVE'];
        const result = findUndefinedFixesInAirway(airwayWithUndefinedFixMock[airwayIcaoMock], fixListMock);

        expect(result).to.eql(expectedResult);
    });

    it('should exclude heading instructions', () => {
        const expectedResult = ['$TEXAS', 'THREVE'];
        const result = findUndefinedFixesInAirway(airwayWithUndefinedFixMock[airwayIcaoMock], fixListMock);

        expect(result).to.eql(expectedResult);
    });


});
