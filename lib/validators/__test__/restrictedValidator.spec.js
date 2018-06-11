'use strict'

const expect = require('chai').expect;
const RestrictedValidator = require('../RestrictedValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('RestrictedValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new RestrictedValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new RestrictedValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.RESTRICTED);
        });

        it('should return false', () => {
            const validator = new RestrictedValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new RestrictedValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new RestrictedValidator(airportKseaMock.fixes);

            expect(validator.isValid).to.be.true;
        });
    });
});
