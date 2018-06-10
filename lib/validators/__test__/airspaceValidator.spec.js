'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const AirspaceValidator = require('../AirspaceValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('.AirspaceValidator', () => {
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
