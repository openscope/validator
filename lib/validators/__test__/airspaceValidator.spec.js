'use strict'

const expect = require('chai').expect;
const AirspaceValidator = require('../AirspaceValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('.AirspaceValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new AirspaceValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new AirspaceValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.AIRSPACE);
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new AirspaceValidator(airportKseaMock.airspace)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new AirspaceValidator(airportKseaMock.airspace);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });
});
