'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const windValidator = require('../windValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('.windValidator', () => {
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
            expect(() => windValidator([], {})).not.to.throw();
        });

        it('should return the correct error message', () => {
            const foundErrorsMock = [];
            const result = windValidator(foundErrorsMock, {});

            expect(foundErrorsMock[0]).to.eq(ERROR_MESSAGE.EXPECTED_WIND_TO_EXIST_IN_AIRPORT);
        });

        it('should call Notifier.fail()', () => {
            const result = windValidator([], {});

            expect(notifierFailSpy.calledOnce).to.be.true;
        });

        it('should return false', () => {
            const result = windValidator([], {});

            expect(result).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => windValidator([], airportKseaMock)).not.to.throw();
        });

        it('should call Notifier.succeed()', () => {
            const result = windValidator([], airportKseaMock);

            expect(notifierSucceedSpy.calledOnce).to.be.true;
        });

        it('should return true', () => {
            const result = windValidator([], airportKseaMock);

            expect(result).to.be.true;
        });
    });

    describe('wind obj keys', () => {
        describe('invalid obj keys', () => {
            const invalidObjKeyMock = {
                wind: {
                    angle: ''
                }
            };

            it('should return the error message', () => {
                const foundErrorsMock = [];
                const result = windValidator(foundErrorsMock, invalidObjKeyMock);

                expect(foundErrorsMock[0]).to.eq(ERROR_MESSAGE.REQUIRED_KEYS_WIND);
            });

            it('should call Notifier.fail()', () => {
                const result = windValidator([], invalidObjKeyMock);

                expect(notifierFailSpy.calledOnce).to.be.true;
            });

            it('should return false', () => {
                const result = windValidator([], invalidObjKeyMock);

                expect(result).to.be.false;
            });
        });
    });
});
