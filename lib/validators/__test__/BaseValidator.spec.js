'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const BaseValidator = require('../BaseValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

// class SidsValidatorFixture extends BaseValidator {
//     constructor(json) {
//         super('sids', json);
//     }
// }

class SpawnPatternsValidatorFixture extends BaseValidator {
    constructor(json) {
        super('spawnPatterns', json);
    }

    validate() {
        this.validateList();
    }

    validateList() {
        super.validateList(this._data);
    }
}

class WindValidatorFixture extends BaseValidator {
    constructor(json) {
        super('wind', json);
    }

    validate() {
        this.validateSingle(this._data);
    }

    validateSingle() {
        super.validateSingle(this._data);
    }
}

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
            let spawnPatternsValidator;
            let windValidator;

            beforeEach(() => {
                spawnPatternsValidator = new SpawnPatternsValidatorFixture(airportKseaMock.spawnPatterns);
                windValidator = new WindValidatorFixture(airportKseaMock.wind);
            });

            afterEach(() => {
                spawnPatternsValidator = null;
                windValidator = null;
            })

            it('should call `.validateList()` when `#_data` is an array', () => {
                const validateListSpy = sinon.spy(spawnPatternsValidator, 'validateList');

                spawnPatternsValidator.validate();

                expect(validateListSpy.callCount).to.eq(1);
            });

            it('should call `.validateSingle()` when `#_data` is an object', () => {
                const validateSingleSpy = sinon.spy(windValidator, 'validateSingle');

                windValidator.validate();

                expect(validateSingleSpy.callCount).to.eq(1);
            });

            it('should not call `.registerError` when no error exists', () => {
                const registerErrorSpy = sinon.spy(windValidator, 'registerError');

                windValidator.validate();

                expect(registerErrorSpy.callCount).to.eq(0);
            });
        });

        describe('`#_name` and `_#key`', () => {
            describe('when passed as lowercase', () => {
                it('should be stored as lowercase', () => {
                    const validator = new WindValidatorFixture({});

                    expect(validator._name).to.eq('wind');
                });

                it('should generate a `#_key` as UPPERCASE', () => {
                    const validator = new WindValidatorFixture({});

                    expect(validator.keyName).to.eq('WIND');
                });
            });

            describe('when passed as camelCase', () => {
                it('should be stored as camelCase', () => {
                    const validator = new SpawnPatternsValidatorFixture({});

                    expect(validator._name).to.eq('spawnPatterns');
                });

                it('should generate a `#_key` as CONSTANT_CASE', () => {
                    const validator = new SpawnPatternsValidatorFixture({});

                    expect(validator.keyName).to.eq('SPAWN_PATTERNS');
                });
            });
        });
    });
});
