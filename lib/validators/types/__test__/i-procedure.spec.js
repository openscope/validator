'use strict';

const expect = require('chai').expect;
const WaypointRestrictionType = require('../i-procedure').WaypointRestrictionType;
const IProcedure = require('../i-procedure').IProcedure;
const ISidProcedure = require('../i-procedure').ISidProcedure;
const IStarProcedure = require('../i-procedure').IStarProcedure;

// SUMMA1
const validProcedureMock = {
    icao: 'SUMMA1',
    name: 'Summa One',
    rwy: {
        KSEA16L: ['NEVJO'],
        KSEA16C: ['NEVJO'],
        KSEA16R: ['NEVJO'],
        KSEA34L: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
        KSEA34C: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
        KSEA34R: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017']
    },
    body: [],
    draw: [
        ['NEVJO', 'SUMMA'],
        ['NEZUG', '_NEZUG070PAE139', '_SUMMA326017', 'SUMMA'],
        ['SUMMA', 'LKV*'],
        ['SUMMA*', 'BKE*']
    ]
};

// SUMMA1
const validSidMock = {
    icao: 'SUMMA1',
    name: 'Summa One',
    rwy: {
        KSEA16L: ['NEVJO'],
        KSEA16C: ['NEVJO'],
        KSEA16R: ['NEVJO'],
        KSEA34L: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
        KSEA34C: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
        KSEA34R: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017']
    },
    body: [],
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
};

// EPH8
const validStarMock = {
    icao: 'EPH8',
    name: 'Ephrata Eight',
    entryPoints: {
        EPH: [],
        ODESS: ['ODESS']
    },
    body: [['EPH', 'A25+'], 'SKYKO', 'HUVUS', 'HETHR'],
    rwy: {
        KSEA16L: ['#250'],
        KSEA16C: ['#250'],
        KSEA16R: ['#250'],
        KSEA34L: ['#163'],
        KSEA34C: ['#163'],
        KSEA34R: ['#163']
    },
    draw: [
        ['ODESS*', 'EPH*', 'SKYKO', 'HUVUS', 'HETHR']
    ]
};

describe('IProcedure', () => {
    it('throws with invalid data', () => {
        expect(() => new IProcedure()).to.throw();
    });

    it('does not throw with valid data', () => {
        expect(() => new IProcedure(validProcedureMock)).to.not.throw();
    });

    describe('WaypointRestrictionType', () => {
        it('returns false when passed invalid data', () => {
            expect(WaypointRestrictionType.is('70')).to.be.false;
            expect(WaypointRestrictionType.is('A70|30')).to.be.false;
        });

        it('returns true when passed valid data', () => {
            expect(WaypointRestrictionType.is('A70+|A100-|S210+|S250-')).to.be.true;
        });
    });

    describe('ISidProcedure', () => {
        it('throws with invalid data', () => {
            expect(() => new ISidProcedure()).to.throw();
        });

        it('does not throw with valid data', () => {
            expect(() => new ISidProcedure(validSidMock)).to.not.throw();
        });
    });

    describe('IStarProcedure', () => {
        it('throws with invalid data', () => {
            expect(() => new IStarProcedure()).to.throw();
        });

        it('does not throw with valid data', () => {
            expect(() => new IStarProcedure(validStarMock)).to.not.throw();
        });
    });
});

