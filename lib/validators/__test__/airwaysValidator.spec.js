'use strict'

const expect = require('chai').expect;
const AirwaysValidator = require('../AirwaysValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('AirwaysValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new AirwaysValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new AirwaysValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.AIRWAYS);
        });

        it('should return false', () => {
            const validator = new AirwaysValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new AirwaysValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new AirwaysValidator(airportKseaMock.airways);

            expect(validator.isValid).to.be.true;
        });
    });
});
