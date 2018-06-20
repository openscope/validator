'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const BaseValidator = require('../BaseValidator');
const SidsValidator = require('../SidsValidator');
const SpawnPatternsValidator = require('../SpawnPatternsValidator');
const WindValidator = require('../WindValidator');
const airportKseaMock = require('./_mock/airportKseaMock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

const invalidSidMock = {
    SUMMA1: {
        rwy: {
            KSEA16L: ['NEVJO'],
            KSEA16C: ['NEVJO'],
            KSEA16R: ['NEVJO'],
            KSEA34L: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
            KSEA34C: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017'],
            KSEA34R: [['NEZUG', 'A40+'], '^_NEZUG070PAE139', '_SUMMA326017']
        },
        exitPoints: {
            BKE: ['SUMMA', 'BKE'],
            LKV: ['SUMMA', 'LKV'],
            SUMMA: ['SUMMA']
        },
        draw: [
            ['NEVJO', 'SUMMA'],
            ['NEZUG', '_NEZUG070PAE139', '_SUMMA326017', 'SUMMA'],
            ['SUMMA', 'LKV*'],
            ['SUMMA*', 'BKE*']
        ]
    }
};

class InvalidValidator extends BaseValidator {
    constructor() {
        super('threeve', null);
    }
}

describe('BaseValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new BaseValidator()).to.not.throw();
        });

        it('should register an error when `#_json` is `undefined`', () => {
            const validator = new BaseValidator('base');

            expect(validator.errors[0].message).to.eq(`${ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base')}`);
        });

        it('should register an error when `#_requiredKeys` is `undefined`', () => {
            const validator = new BaseValidator('threeve', airportKseaMock);

            expect(validator.errors[0].message).to.eq(`${ERROR_MESSAGE.UNDEFINED.BASE.replace('{KEY}', 'base')}`);
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new BaseValidator('base', airportKseaMock)).not.to.throw();
        });

        it('should not call `.registerError` when no error exists', () => {
            const windValidator = new WindValidator(airportKseaMock.wind);
            const registerErrorSpy = sinon.spy(windValidator, 'registerError');

            windValidator.validate();

            expect(registerErrorSpy.callCount).to.eq(0);
        });
    });

    describe('.validate()', () => {
        it('should throw', () => {
            const validator = new BaseValidator();

            expect(() => validator.validate()).to.throw();
        });
    });

    describe('.registerError()', () => {
        it('should throw when it does not receive a MessageType', () => {
            const validator = new BaseValidator();

            expect(() => validator.registerError({})).to.throw();
        });
    });

    describe('when extended', () => {
        describe('and passed invalid data', () => {
            it('it should not throw', () => {
                expect(() => new InvalidValidator()).to.not.throw();
            });

            it('should return early from .validateObj()', () => {
                const validator = new InvalidValidator();
                const validateSingleSpy = sinon.spy(validator, 'validateSingle');

                validator.validateObj();

                expect(validateSingleSpy.notCalled).to.be.true;
            });

            it('should return early from .validateList()', () => {
                const validator = new InvalidValidator();
                const validateSingleSpy = sinon.spy(validator, 'validateSingle');

                validator.validateList();

                expect(validateSingleSpy.notCalled).to.be.true;
            });
        });
    });

    describe('when passed valid data', () => {
        describe('and `#_data` is an dict', () => {
            let sidsValidator;

            beforeEach(() => {
                sidsValidator = new SidsValidator(airportKseaMock.airways);
            });

            afterEach(() => {
                sidsValidator = null;
            });

            it('should call `.validateObj()` when `#_data` is an dict', () => {
                const validateObjSpy = sinon.spy(sidsValidator, 'validateObj');

                sidsValidator.validate();

                expect(validateObjSpy.callCount).to.eq(1);
            });

            it('should call `.validateItem()` with each item in the dict', () => {
                const _validateItemSpy = sinon.spy(sidsValidator, '_validateItem');

                sidsValidator.validateObj();

                expect(_validateItemSpy.callCount).to.eq(2);
            });

            it('should provide a contextual error message for the `#key` that failed', () => {
                const expectedResult = 'Fail: `sids` - `SUMMA1` is missing the following required keys: icao, name, body';
                const validator = new SidsValidator(invalidSidMock);

                validator.validate();

                expect(validator.errors[0].message).to.eq(expectedResult);
            });
        });

        describe('and `#_data` is an array', () => {
            let spawnPatternsValidator;

            beforeEach(() => {
                spawnPatternsValidator = new SpawnPatternsValidator(airportKseaMock);
            });

            afterEach(() => {
                spawnPatternsValidator = null;
            });

            it('should call `.validateList()` when `#_data` is an array', () => {
                const validateListSpy = sinon.spy(spawnPatternsValidator, 'validateList');

                spawnPatternsValidator.validate();

                expect(validateListSpy.callCount).to.eq(1);
            });

            it('should call `._validateItem()` with each item in the array', () => {
                const _validateItemSpy = sinon.spy(spawnPatternsValidator, '_validateItem');

                spawnPatternsValidator.validate();

                expect(_validateItemSpy.callCount).to.eq(12);
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

        describe('.validateInterface()', () => {
            describe('with invalid data', () => {
                it('adds the correct error to `_#errors`', () => {
                    const expectedResult = 'Invalid value "" supplied to IWind/angle: Number';
                    const invalidWindMock = {
                        angle: '',
                        speed: 1
                    };
                    const validator = new WindValidator(invalidWindMock);

                    validator.validate();

                    expect(validator.errors[0].message).to.eq(expectedResult);
                });
            });

            describe('with valid data', () => {
                it('does not change the length of `#_errors`', () => {
                    const windMock = {
                        angle: 2,
                        speed: 1
                    };
                    const validator = new WindValidator(windMock);

                    validator.validate();

                    expect(validator.errors.length).to.eq(0);
                });
            });
        });
    });
});
