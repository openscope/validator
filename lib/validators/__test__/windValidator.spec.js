'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const WindValidator = require('../WindValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('.WindValidator', () => {
    let notifierStartSpy;
    let notifierSucceedSpy;
    let notifierFailSpy;

    beforeEach(() => {
        notifierStartSpy = sinon.stub(Notifier, 'start');
        notifierSucceedSpy = sinon.stub(Notifier, 'succeed');
        notifierFailSpy = sinon.stub(Notifier, 'fail');
    });

    afterEach(() => {
        notifierStartSpy.restore();
        notifierSucceedSpy.restore();
        notifierFailSpy.restore();
    });

    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new WindValidator()).not.to.throw();
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
