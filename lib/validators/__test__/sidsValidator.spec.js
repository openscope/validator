'use strict'

const expect = require('chai').expect;
const sinon = require('sinon');
const SidsValidator = require('../SidsValidator');
const airportKseaMock = require('./_mock/airportKseaMock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

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
            KSEA34R: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017']
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

describe('SidsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new SidsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new SidsValidator();

            expect(validator.errors[0].message).to.eq(ERROR_MESSAGE.UNDEFINED.SIDS);
        });

        it('should return false', () => {
            const validator = new SidsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new SidsValidator(airportKseaMock.sids, airportKseaMock.fixes)).not.to.throw();
        });

        it('#isValid should return true', () => {
            const validator = new SidsValidator(airportKseaMock.sids, airportKseaMock.fixes);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });

    describe('when an undefined fix is present in a procedure', () => {
        it('#isValid should return false', () => {
            const validator = new SidsValidator(sidWithUndefinedFixMock, airportKseaMock.fixes);

            validator.validate();

            expect(validator.isValid).to.be.false;
        });

        it('should call .registerError()', () => {
            const validator = new SidsValidator(sidWithUndefinedFixMock, airportKseaMock.fixes);
            const registerErrorSpy = sinon.spy(validator, 'registerError');

            validator.validate();

            expect(registerErrorSpy.callCount).to.eq(1);
        });

        it('should return the correct error message', () => {
            const validator = new SidsValidator(sidWithUndefinedFixMock, airportKseaMock.fixes);

            validator.validate();

            expect(validator.errors[0].message).to.eq(ERROR_MESSAGE.PROCEDURE.UNDEFINED_FIX);
        });
    });
});
