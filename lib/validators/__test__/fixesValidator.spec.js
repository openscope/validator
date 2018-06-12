'use strict'

const expect = require('chai').expect;
const FixesValidator = require('../fixesValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('FixesValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new FixesValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new FixesValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.FIXES);
        });

        it('should return false', () => {
            const validator = new FixesValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new FixesValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new FixesValidator(airportKseaMock.fixes);

            expect(validator.isValid).to.be.true;
        });
    });
});
