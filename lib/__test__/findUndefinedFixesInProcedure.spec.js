
'use strict'

const expect = require('chai').expect;
const findUndefinedFixesInProcedure = require('../findUndefinedFixesInProcedure');
// FIXME: move this file up
const airportKseaMock = require('../validators/__test__/_mock/airportKseaMock');

const sidWithUndefinedFixMock = {
    SUMMA1: {
        icao: 'SUMMA1',
        name: 'Summa One',
        rwy: {
            KSEA16L: ['NEVJO'],
            KSEA16C: ['NEVJO'],
            KSEA16R: ['NEVJO'],
            KSEA34L: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
            KSEA34C: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
            KSEA34R: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017', "#210"]
        },
        body: ['THREVE', ['$TEXAS', 'A50-A75+|S250-']],
        exitPoints: {
            BKE: ['SUMMA', 'BKE'],
            LKV: ['SUMMA', 'LKV'],
            SUMMA: ['SUMMA']
        },
        draw: [
            ['NEVJO', 'SUMMA'],
            ['NEZUG', '_NEZUG070PAE139', '_SUMMA326017', 'SUMMA'],
            ['SUMMA', 'LKV*'],
            ['SUMMA*', 'BKE*']
        ]
    }
};

describe('.findUndefinedFixesInProcedure()', () => {
    const procedureIcaoMock = 'SUMMA1';
    const fixListMock = Object.keys(airportKseaMock.fixes);

    it('should accept pocedureIco, procedure and fixList as args', () => {
        const expectedResult = ['THREVE', '$TEXAS'];
        const result = findUndefinedFixesInProcedure(procedureIcaoMock, sidWithUndefinedFixMock[procedureIcaoMock], fixListMock);

        expect(result).to.eql(expectedResult);
    });

    it('should exclude heading instructions', () => {
        const expectedResult = ['THREVE', '$TEXAS'];
        const result = findUndefinedFixesInProcedure(procedureIcaoMock, sidWithUndefinedFixMock[procedureIcaoMock], fixListMock);

        expect(result).to.eql(expectedResult);
    });


});
