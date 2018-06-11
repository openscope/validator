'use strict'

const expect = require('chai').expect;
const SpawnPatternsValidator = require('../SpawnPatternsValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('SpawnPatternsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new SpawnPatternsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new SpawnPatternsValidator();

            expect(validator.errors[0]).to.eq(ERROR_MESSAGE.UNDEFINED.SPAWN_PATTERNS);
        });

        it('should return false', () => {
            const validator = new SpawnPatternsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new SpawnPatternsValidator(airportKseaMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new SpawnPatternsValidator(airportKseaMock.spawnPatterns);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });
});
