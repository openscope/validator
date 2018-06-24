'use strict'

const expect = require('chai').expect;
const sinon = require('sinon');
const StarsValidator = require('../StarsValidator');
const airportKseaMock = require('./_mock/airportKseaMock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

const starWithUndefinedFixMock = {
    HAWKZ6: {
        icao: 'HAWKZ6',
        name: 'Hawks Six',
        entryPoints: {
            BTG: [['BTG', 'A240+'], ['PTERA', 'A220+'], 'KRIEG'],
            HAWKZ: [],
            KRIEG: ['KRIEG'],
            LATAY: ['LATAY', 'AAYRR'],
            LKV: ['LKV', ['BTG', 'A240+'], ['PTERA', 'A220+'], 'KRIEG'],
            LMT: ['LMT', ['BTG', 'A240+'], ['PTERA', 'A220+'], 'KRIEG']
        },
        body: [['HAWKZ', 'A120+|S270'], 'LIINE', 'THREVE', ['$TEXAS', 'A50-A75+|S250-']],
        rwy: {
            KSEA16L: [['PIKEZ', 'A120+|A150-|S250'], 'COFAY', ['BREVE', 'A100+|A110-|S250'], ['NETTZ', 'A80+|S230'], ['KWEST', 'A70+'], ['^VASHN', 'A60|S210'], '#344'],
            KSEA16C: [['PIKEZ', 'A120+|A150-|S250'], 'COFAY', ['BREVE', 'A100+|A110-|S250'], ['NETTZ', 'A80+|S230'], ['KWEST', 'A70+'], ['^VASHN', 'A60|S210'], '#344'],
            KSEA16R: [['PIKEZ', 'A120+|A150-|S250'], 'COFAY', ['BREVE', 'A100+|A110-|S250'], ['NETTZ', 'A80+|S230'], ['KWEST', 'A70+'], ['^VASHN', 'A60|S210'], '#344'],
            KSEA34L: [['FOOTT', 'A100+|A120-|S250'], ['GOALZ', 'A80+'], ['SONDR', 'A60|S230']],
            KSEA34C: [['FOOTT', 'A100+|A120-|S250'], ['GOALZ', 'A80+'], ['SONDR', 'A60|S230']],
            KSEA34R: [['FOOTT', 'A100+|A120-|S250'], ['GOALZ', 'A80+'], ['SONDR', 'A60|S230']]
        },
        draw: [
            ['LKV*', 'BTG*', 'HAWKZ*'],
            ['LMT*', 'BTG', 'HAWKZ'],
            ['BTG', 'PTERA', 'KRIEG*', 'HAWKZ'],
            ['LATAY*', 'AAYRR', 'HAWKZ'],
            ['HAWKZ', 'LIINE'],
            ['LIINE', 'PIKEZ', 'COFAY', 'BREVE', 'NETTZ', 'KWEST', 'VASHN'],
            ['LIINE', 'FOOTT', 'GOALZ', 'SONDR']
        ]
    }
};

describe('StarsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new StarsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new StarsValidator();

            expect(validator.errors[0].message).to.eq(ERROR_MESSAGE.UNDEFINED.STARS);
        });

        it('should return false', () => {
            const validator = new StarsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new StarsValidator(airportKseaMock, airportKseaMock.fixes)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new StarsValidator(airportKseaMock.stars, airportKseaMock.fixes);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });

    describe('when an undefined fix is present in a procedure', () => {
        it('#isValid should return false', () => {
            const validator = new StarsValidator(starWithUndefinedFixMock, airportKseaMock.fixes);

            validator.validate();

            expect(validator.isValid).to.be.false;
        });

        it('should call .registerError()', () => {
            const validator = new StarsValidator(starWithUndefinedFixMock, airportKseaMock.fixes);
            const registerErrorSpy = sinon.spy(validator, 'registerError');

            validator.validate();

            expect(registerErrorSpy.callCount).to.eq(1);
        });

        it('should return the correct error message', () => {
            const validator = new StarsValidator(starWithUndefinedFixMock, airportKseaMock.fixes);

            validator.validate();

            expect(validator.errors[0].message).to.eq(ERROR_MESSAGE.PROCEDURE.UNDEFINED_FIX.STAR);
        });
    });
});
