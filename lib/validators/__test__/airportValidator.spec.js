'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const ERROR_MESSAGE = require('../errorMessage');
const airportValidator = require('../airportValidator');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('airportValidator', () => {
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
            expect(() => airportValidator([], {})).not.to.throw();
        });

        it('should return false', () => {
            const result = airportValidator([], {});

            expect(result).to.be.false;
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
                const foundErrorMock = [];
                const result = airportValidator(foundErrorMock, invalidObjKeysMock);

                expect(foundErrorMock.length).to.eq(1);
                expect(foundErrorMock[0]).to.eq(`${ERROR_MESSAGE.MISSING_KEYS_AIRPORT} icao`);
            });

            it('should call Notifier.fail()', () => {
                const result = airportValidator([], invalidObjKeysMock);

                expect(notifierFailSpy.calledOnce).to.be.true;
            });

            it('should return false', () => {
                const foundErrorMock = [];
                const result = airportValidator(foundErrorMock, invalidObjKeysMock);

                expect(result).to.be.false;
            });
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => airportValidator([], airportKseaMock)).not.to.throw();
        });

        it('should call Notifier.succeed()', () => {
            const result = airportValidator([], airportKseaMock);

            expect(notifierSucceedSpy.calledOnce).to.be.true;
        });

        it('should return true', () => {
            const foundErrorMock = [];
            const result = airportValidator(foundErrorMock, airportKseaMock);

            expect(result).to.be.true;
        });
    });
});