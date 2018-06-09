'use strict'

const expect = require('chai').expect
const sinon = require('sinon');
const Notifier = require('../../notifier');
const airspaceValidator = require('../airspaceValidator');
const ERROR_MESSAGE = require('../errorMessage');
const airportKseaMock = require('./_mock/airport-ksea-mock');

describe('.airspaceValidator', () => {
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
            expect(() => airspaceValidator([], {})).not.to.throw();
        });

        it('should return the correct error message', () => {
            const foundErrorsMock = [];
            const result = airspaceValidator(foundErrorsMock, {});

            expect(foundErrorsMock[0]).to.eq(ERROR_MESSAGE.EXPECTED_AIRSPACE_TO_EXIST_IN_AIRPORT);
        });

        it('should call Notifier.fail()', () => {
            const result = airspaceValidator([], {});

            expect(notifierFailSpy.calledOnce).to.be.true;
        });

        it('should return false', () => {
            const result = airspaceValidator([], {});

            expect(result).to.be.false;
        });
    });

    describe('valid data', () => {
        it('should not throw with valid data', () => {
            expect(() => airspaceValidator([], airportKseaMock)).not.to.throw();
        });

        it('should call Notifier.succeed()', () => {
            const foundErrorsMock = []
            const result = airspaceValidator(foundErrorsMock, airportKseaMock);

            expect(notifierSucceedSpy.callCount).to.eq(2);
        });

        it('should return true', () => {
            const result = airspaceValidator([], airportKseaMock);

            expect(result).to.be.true;
        });
    });

    describe('airspace obj keys', () => {
        describe('invalid obj keys', () => {
            const invalidObjKeyMock = {
                airspace: [
                    {
                        floor: '',
                        poly: '',
                        threeve: ''
                    }
                ]
            };

            it('should return the error message', () => {
                const foundErrorsMock = [];
                const result = airspaceValidator(foundErrorsMock, invalidObjKeyMock);

                expect(foundErrorsMock[0]).to.eq('FAILED: `airspace` poly section #0 is missing the following keys: ceiling, airspace_class');
            });

            it('should call Notifier.fail()', () => {
                const result = airspaceValidator([], invalidObjKeyMock);

                expect(notifierFailSpy.calledOnce).to.be.true;
            });

            it('should return false', () => {
                const result = airspaceValidator([], invalidObjKeyMock);

                expect(result).to.be.false;
            });
        });
    });

    // describe('airspace poly lat/long', () => {
    //     describe('invalid lat/long format', () => {
    //         it('should return an error message', () => {
    //             const foundErrorsMock = [];
    //             const invalidAirportMock = {...airportKseaMock};
    //             const invalidAirspacePoly = {
    //                 floor: 100,
    //                 ceiling: 150,
    //                 airspace_class: "B",
    //                 poly: [
    //                     ["N47.83333330", "W121.69999940"],
    //                     ["N47.95335007", "Q300"]
    //                 ]
    //             };
    //             invalidAirportMock.airspace.push(invalidAirspacePoly);
    //             const result = airspaceValidator(foundErrorsMock, invalidAirportMock);

    //             console.log(result, foundErrorsMock);
    //         });
    //     });
    // });
});
