'use strict'

const expect = require('chai').expect;
const MapsValidator = require('../MapsValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('MapsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new MapsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new MapsValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.MAPS);
        });

        it('should return false', () => {
            const validator = new MapsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new MapsValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new MapsValidator(airportKseaMock.maps);

            expect(validator.isValid).to.be.true;
        });
    });
});
