'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const BaseValidator = require('../BaseValidator');
const AirwaysValidator = require('../AirwaysValidator');
const SpawnPatternsValidator = require('../SpawnPatternsValidator');
const WindValidator = require('../WindValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('BaseValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new BaseValidator()).to.not.throw();
        });

        it('should register an error when `#_json` is `undefined`', () => {
            const validator = new BaseValidator('base');

            expect(validator.errors[0]).to.eq(`${ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base')}`);
        });

        it('should register an error when `#_requiredKeys` is `undefined`', () => {
            const validator = new BaseValidator('threeve', airportKseaMock);

            expect(validator.errors[0]).to.eq(`${ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base')}`);
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new BaseValidator('base', airportKseaMock)).not.to.throw();
        });
    });

    describe('BaseValidator.validate()', () => {
        it('should throw', () => {
            const validator = new BaseValidator();

            expect(() => validator.validate()).to.throw();
        });
    });

    describe('when extended', () => {
        describe('and passed valid data', () => {
            describe('and `#_data` is an dict', () => {
                let airwaysValidator;

                beforeEach(() => {
                    airwaysValidator = new AirwaysValidator(airportKseaMock.airways);
                });

                afterEach(() => {
                    airwaysValidator = null;
                });

                it('should call `.validateObj()` when `#_data` is an dict', () => {
                    const validateObjSpy = sinon.spy(airwaysValidator, 'validateObj');

                    airwaysValidator.validate();

                    expect(validateObjSpy.callCount).to.eq(1);
                });

                it('should call `.validateItem()` with each item in the dict', () => {
                    const validateSingleSpy = sinon.spy(airwaysValidator, 'validateSingle');

                    airwaysValidator.validateObj();

                    expect(validateSingleSpy.callCount).to.eq(2);
                });
            });

            describe('and `#_data` is an array', () => {
                let spawnPatternsValidator;

                beforeEach(() => {
                    spawnPatternsValidator = new SpawnPatternsValidator(airportKseaMock.spawnPatterns);
                });

                afterEach(() => {
                    spawnPatternsValidator = null;
                });

                it('should call `.validateList()` when `#_data` is an array', () => {
                    const validateListSpy = sinon.spy(spawnPatternsValidator, 'validateList');

                    spawnPatternsValidator.validate();

                    expect(validateListSpy.callCount).to.eq(1);
                });

                it('should call `.validateSingle()` with each item in the array', () => {
                    const validateSingleSpy = sinon.spy(spawnPatternsValidator, 'validateSingle');

                    spawnPatternsValidator.validate();

                    expect(validateSingleSpy.callCount).to.eq(12);
                });
            });

            describe('and `#_data` is an object', () => {
                let windValidator;

                beforeEach(() => {
                    windValidator = new WindValidator(airportKseaMock.wind);
                });

                afterEach(() => {
                    windValidator = null;
                });

                it('should call `.validateSingle()` when `#_data` is an object', () => {
                    const validateSingleSpy = sinon.spy(windValidator, 'validateSingle');

                    windValidator.validate();

                    expect(validateSingleSpy.callCount).to.eq(1);
                });
            });

            it('should not call `.registerError` when no error exists', () => {
                const windValidator = new WindValidator(airportKseaMock.wind);
                const registerErrorSpy = sinon.spy(windValidator, 'registerError');

                windValidator.validate();

                expect(registerErrorSpy.callCount).to.eq(0);
            });
        });

        describe('`#_name` and `_#key`', () => {
            let spawnPatternsValidator;
            let windValidator;

            beforeEach(() => {
                spawnPatternsValidator = new SpawnPatternsValidator({});
                windValidator = new WindValidator({});
            });

            afterEach(() => {
                spawnPatternsValidator = null;
                windValidator = null;
            });

            describe('when passed as lowercase', () => {
                it('should be stored as lowercase', () => {
                    expect(windValidator._name).to.eq('wind');
                });

                it('should generate a `#_key` as UPPERCASE', () => {
                    expect(windValidator.keyName).to.eq('WIND');
                });
            });

            describe('when passed as camelCase', () => {
                it('should be stored as camelCase', () => {
                    expect(spawnPatternsValidator._name).to.eq('spawnPatterns');
                });

                it('should generate a `#_key` as CONSTANT_CASE', () => {
                    expect(spawnPatternsValidator.keyName).to.eq('SPAWN_PATTERNS');
                });
            });
        });
    });
});
