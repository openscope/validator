'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const airportValidator = require('../airportValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('airportValidator', () => {
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
            expect(() => airportValidator([], {})).not.to.throw();
        });

        it('should return false', () => {
            const result = airportValidator([], {});

            expect(result).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => airportValidator([], airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const foundErrorMock = [];
            const result = airportValidator(foundErrorMock, airportKseaMock);

            expect(result).to.be.true;
        });
    });
});
