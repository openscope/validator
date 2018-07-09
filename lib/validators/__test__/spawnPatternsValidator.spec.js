'use strict'

const expect = require('chai').expect;
const SpawnPatternsValidator = require('../SpawnPatternsValidator');
const airportKseaMock = require('./_mock/airportKseaMock');
const airlineMock = require('./_mock/airlinesMock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe.only('SpawnPatternsValidator', () => {
    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new SpawnPatternsValidator()).not.to.throw();
        });

        it('should return the correct error message', () => {
            const validator = new SpawnPatternsValidator();

            expect(validator.errors[0].message).to.eq(ERROR_MESSAGE.UNDEFINED.SPAWN_PATTERNS);
        });

        it('should return false', () => {
            const validator = new SpawnPatternsValidator();

            expect(validator.isValid).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new SpawnPatternsValidator(airportKseaMock.spawnPatterns, airlineMock)).not.to.throw();
        });

        it('should return true', () => {
            const validator = new SpawnPatternsValidator(airportKseaMock.spawnPatterns, airlineMock);

            validator.validate();

            expect(validator.isValid).to.be.true;
        });
    });

    describe('.validateAirlineFLeets()', () => {

    });
});
