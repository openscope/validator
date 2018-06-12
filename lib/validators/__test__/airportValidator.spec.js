'use strict'

const expect = require('chai').expect;
const AirportValidator = require('../AirportValidator');
const airportKseaMock = require('./_mock/airportKseaMock');
const ERROR_MESSAGE = require('./_mock/errorMessageMock');

describe('AirportValidator', () => {
    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => new AirportValidator(airportKseaMock)).not.to.throw();
        });
    });

    describe('invalid data', () => {
        it('should not throw with invalid data', () => {
            expect(() => new AirportValidator()).not.to.throw();
        });

        it('should return false', () => {
            const validator = new AirportValidator();

            expect(validator.isValid).to.be.false;
        });

        describe('incorrect obj keys', () => {
            const invalidObjKeysMock = {
                iata: {},
                magnetic_north: {},
                ctr_radius: {},
                ctr_ceiling: {},
                initial_alt: {},
                position: {},
                rr_radius_nm: {},
                rr_center: {},
                has_terrain: {},
                wind: {},
                arrivalRunway: {},
                departureRunway: {},
                airspace: {},
                fixes: {},
                restricted: {},
                runways: {},
                airways: {},
                sids: {},
                stars: {},
                spawnPatterns: {},
                maps: {}
            };

            it('return the correct error message', () => {
                const validator = new AirportValidator(invalidObjKeysMock);

                validator.validate();

                expect(validator.errors[0]).to.eq(`${ERROR_MESSAGE.MISSING_KEYS.AIRPORT}: icao`);
            });

            it('should return false', () => {
                const validator = new AirportValidator(invalidObjKeysMock);

                validator.validate();

                expect(validator.isValid).to.be.false;
            });
        });
    });
});
