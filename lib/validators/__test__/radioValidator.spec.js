'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const radioValidator = require('../radioValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('radioValidator', () => {
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
            expect(() => radioValidator([], {})).not.to.throw();
        });

        it('should return false', () => {
            const result = radioValidator([], {});

            expect(result).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => radioValidator([], airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const result = radioValidator([], airportKseaMock);

            expect(result).to.be.true;
        });
    });
});
