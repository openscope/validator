'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const fixValidator = require('../fixValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('.fixValidator', () => {
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
            expect(() => fixValidator([], {})).not.to.throw();
        });

        it('should return the correct error message', () => {
            const foundErrorsMock = [];

            fixValidator(foundErrorsMock, {});

            expect(foundErrorsMock[0]).to.eq(ERROR_MESSAGE.EXPECTED_FIXES_TO_EXIST_IN_AIRPORT);
        });

        it('should call Notifier.fail()', () => {
            fixValidator([], {});

            expect(notifierFailSpy.calledOnce).to.be.true;
        });

        it('should return false', () => {
            expect(fixValidator([], {})).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => fixValidator([], airportKseaMock)).not.to.throw();
        });

        it('should call Notifier.succeed()', () => {
            fixValidator([], airportKseaMock);

            expect(notifierSucceedSpy.calledOnce).to.be.true;
        });

        it('should return true', () => {
            expect(fixValidator([], airportKseaMock)).to.be.true;
        });
    });
});
