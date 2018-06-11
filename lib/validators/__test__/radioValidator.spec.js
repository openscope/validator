'use strict'

const expect = require('chai').expect;
const RadioValidator = require('../radioValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('RadioValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new RadioValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new RadioValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.RADIO);
        });

        it('should return false', () => {
            const validator = new RadioValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new RadioValidator(airportKseaMock.radio)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new RadioValidator(airportKseaMock.radio);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });

    describe('radio obj keys', () => {
        describe('invalid obj keys', () => {
            const invalidRadioMock = {
                twr: '',
                dep: '',
                threeve: ''
            }

            it('should return the correct error', () => {
                const validator = new RadioValidator(invalidRadioMock);

                validator.validate();

                expect(validator.errors[0]).to.eq(`${ERROR_MESSAGE.MISSING_KEYS.RADIO}: app`);
            });

            it('should return false', () => {
                const validator = new RadioValidator(invalidRadioMock);

                validator.validate();

                expect(validator.isValid).to.be.false;
            });
        });
    });
});
