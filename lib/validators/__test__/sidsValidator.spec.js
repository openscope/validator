'use strict'

const expect = require('chai').expect;
const SidsValidator = require('../SidsValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('SidsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new SidsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new SidsValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.SIDS);
        });

        it('should return false', () => {
            const validator = new SidsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new SidsValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new SidsValidator(airportKseaMock.sids);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });
});
