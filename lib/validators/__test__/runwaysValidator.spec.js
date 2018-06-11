'use strict'

const expect = require('chai').expect;
const RunwaysValidator = require('../RunwaysValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('RunwaysValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new RunwaysValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new RunwaysValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.RUNWAYS);
        });

        it('should return false', () => {
            const validator = new RunwaysValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new RunwaysValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new RunwaysValidator(airportKseaMock.runways);

            expect(validator.isValid).to.be.true;
        });
    });
});
