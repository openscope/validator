'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const BaseValidator = require('../BaseValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

class AirspaceValidatorFixture extends BaseValidator {
    constructor(name, json) {
        super(name, json);
    }
}

class WindValidatorFixture extends BaseValidator {
    constructor(name, json) {
        super(name, json);
    }
}

describe('.BaseValidator', () => {
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
            expect(() => new BaseValidator()).to.throw();
        });

        it('should register an error when `#_json` is `undefined`', () => {
            const validator = new BaseValidator('base');

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.BASE);
        });

        it('should register an error when `#_requiredKeys` is `undefined`', () => {
            const validator = new BaseValidator('threeve', airportKseaMock);

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.BASE);
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new BaseValidator('base', airportKseaMock)).not.to.throw();
        });
    });

    describe('when extended', () => {
        describe('when passed valid data', () => {
            let airspaceValidator;
            let windValidator;

            beforeEach(() => {
                windValidator = new WindValidatorFixture('wind', airportKseaMock.wind);
                airspaceValidator = new AirspaceValidatorFixture('airspace', airportKseaMock.airspace);
            });

            afterEach(() => {
                windValidator = null;
                airspaceValidator = null;
            })

            it('should call `._validateList()` when `#_data` is an array', () => {
                const _validateListSpy = sinon.spy(airspaceValidator, '_validateList');

                airspaceValidator.validate();

                expect(_validateListSpy.callCount).to.eq(1);
            });

            it('should call `._validateSingle()` when `#_data` is an object', () => {
                const _validateSingleSpy = sinon.spy(windValidator, '_validateSingle');

                windValidator.validate();

                expect(_validateSingleSpy.callCount).to.eq(1);
            });

            it('should not call `.registerError` when no error exists', () => {
                const registerErrorSpy = sinon.spy(windValidator, 'registerError');

                windValidator.validate();

                expect(registerErrorSpy.callCount).to.eq(0);
            });
        });
    });
});
