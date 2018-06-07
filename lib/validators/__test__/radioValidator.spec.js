'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const radioValidator = require('../radioValidator');
const ERROR_MESSAGE = require('../errorMessage');
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

        it('should call Notifier.fail()', () => {
            const result = radioValidator([], {});

            expect(notifierFailSpy.calledOnce).to.be.true;
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

        it('should call Notifier.succeed()', () => {
            const result = radioValidator([], airportKseaMock);

            expect(notifierSucceedSpy.calledOnce).to.be.true;
        });
    });

    describe('radio obj keys', () => {
        describe('invalid obj keys', () => {
            const invalidRadioMock = {
                radio: {
                    twr: '',
                    dep: '',
                    threeve: ''
                }
            }

            it('should return the correct error', () => {
                const foundErrorsMock = [];
                const result = radioValidator(foundErrorsMock, invalidRadioMock);

                expect(foundErrorsMock.length).to.eq(1);
                expect(foundErrorsMock[0]).to.eq(ERROR_MESSAGE.REQUIRED_KEYS_RADIO);
            });

            it('should call Notifier.fail()', () => {
                const result = radioValidator([], invalidRadioMock);

                expect(notifierFailSpy.calledOnce).to.be.true;
            });

            it('should return false', () => {
                const result = radioValidator([], invalidRadioMock);

                expect(result).to.be.false;
            });
        });
    });
});
