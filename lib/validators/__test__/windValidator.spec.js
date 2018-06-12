'use strict'

const expect = require('chai').expect;
const WindValidator = require('../WindValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('.WindValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new WindValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new WindValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.WIND);
        });

        it('should return false', () => {
            const validator = new WindValidator('base');

            validator.validate();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new WindValidator(airportKseaMock.wind)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new WindValidator(airportKseaMock.wind);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });

    describe('wind obj keys', () => {
        describe('invalid obj keys', () => {
            const invalidWindMock = {
                angle: ''
            };

            it('should return the error message', () => {
                const validator = new WindValidator(invalidWindMock);

                validator.validate();

                expect(validator.errors[0]).to.eq(`${ERROR_MESSAGE.MISSING_KEYS.WIND}: speed`);
            });
        });
    });
});
