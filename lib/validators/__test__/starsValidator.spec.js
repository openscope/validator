'use strict'

const expect = require('chai').expect;
const StarsValidator = require('../StarsValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('StarsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new StarsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new StarsValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.STARS);
        });

        it('should return false', () => {
            const validator = new StarsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new StarsValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new StarsValidator(airportKseaMock.stars);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });
});
