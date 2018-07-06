'use strict';

const expect = require('chai').expect;
const ILatLong = require('../i-lat-long');

describe('ILatLong', () => {
    describe('LatitudeValueType', () => {
        it('returns false for a numeric string greater than 90', () => {
            expect(ILatLong.LatitudeValueType.is('100.003')).to.be.false;
        });

        it('returns false for a number greater than 90', () => {
            expect(ILatLong.LatitudeValueType.is(90.003)).to.be.false;
        });

        it('returns false for a negitive number less than -90', () => {
            expect(ILatLong.LatitudeValueType.is(-90.003)).to.be.false;
        });

        it('returns true for a numeric string less than 90', () => {
            expect(ILatLong.LatitudeValueType.is('40.003')).to.be.true;
        });

        it('returns true for a number less than 90', () => {
            expect(ILatLong.LatitudeValueType.is(40.003)).to.be.true;
        });

        it('returns true for a negitive number greater than -90', () => {
            expect(ILatLong.LatitudeValueType.is(-40.003)).to.be.true;
        });
    });

    describe('LongitudeValueType', () => {
        it('returns false for a numeric string greater than 180', () => {
            expect(ILatLong.LongitudeValueType.is('180.003')).to.be.false;
        });

        it('returns false for a number greater than 180', () => {
            expect(ILatLong.LongitudeValueType.is(190.003)).to.be.false;
        });

        it('returns false for a negitive number less than -180', () => {
            expect(ILatLong.LongitudeValueType.is(-180.003)).to.be.false;
        });

        it('returns true for a numeric string less than 180', () => {
            expect(ILatLong.LongitudeValueType.is('40.003')).to.be.true;
        });

        it('returns true for a number less than 180', () => {
            expect(ILatLong.LongitudeValueType.is(40.003)).to.be.true;
        });

        it('returns true for a negitive number greater than -180', () => {
            expect(ILatLong.LongitudeValueType.is(-40.003)).to.be.true;
        });
    });

    describe('.hasDecimalSymbol()', () => {
        it('should return false when passed data that does not contain the `D` symbol', () => {
            expect(ILatLong.hasDecimalSymbol('W076.037')).to.be.false;
        });

        it('should return true when passed data that contains the `D` symbol', () => {
            expect(ILatLong.hasDecimalSymbol('W076d37.037')).to.be.true;
        });

        it('should return true when passed data that contains the `D` symbol and others', () => {
            expect(ILatLong.hasDecimalSymbol('N51d32m17.76')).to.be.true;
        });
    });

    describe('.hasMinuteSymbol()', () => {
        it('should return false when passed data that does not contain an `M` symbol', () => {
            expect(ILatLong.hasMinuteSymbol('W076d37.02')).to.be.false;
        });

        it('should return true when passed data that contains an `M` symbol', () => {
            expect(ILatLong.hasMinuteSymbol('W076d37m02.20')).to.be.true;
        });
    });

    describe('.hasCardinalLetterPrefix()', () => {
        describe('when passed data not prefixed with N, E, S, W', () => {
            it('should return false when passed value without cardinal direction', () => {
                expect(ILatLong.hasCardinalLetterPrefix('40.811')).to.be.false;
            });
        });

        describe('when passed data prefixed with N, E, S, W', () => {
            it('should return true when passed degrees minutes format', () => {
                expect(ILatLong.hasCardinalLetterPrefix('N40d56.811')).to.be.true;
            });

            it('should return true when passed degrees minutes seconnds format', () => {
                expect(ILatLong.hasCardinalLetterPrefix('N47d34.80m0')).to.be.true;
            });

            it('should return true when passed decimal degrees format', () => {
                expect(ILatLong.hasCardinalLetterPrefix('S40.94684722')).to.be.true;
            });
        });
    });

    describe('.isDegreesMinutesSeconds()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed valid data', () => {
                expect(ILatLong.isDegreesMinutesSeconds('N47d34.80m0')).to.be.true;
                // expect(ILatLong.isDegreesMinutesSeconds('N51d32m17.76')).to.be.true;
                // expect(ILatLong.isDegreesMinutesSeconds('W0d12m45.87')).to.be.true;
                // expect(ILatLong.isDegreesMinutesSeconds('W076d37m02.20')).to.be.true;
                // expect(ILatLong.isDegreesMinutesSeconds('W122d03.84m0')).to.be.true;
                // expect(ILatLong.isDegreesMinutesSeconds(40.94684722)).to.be.false;
                // expect(ILatLong.isDegreesMinutesSeconds(-40.94684722)).to.be.false;
            });
        });
    });

    describe('.isDegreesMinutes()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed valid data', () => {
                expect(ILatLong.isDegreesMinutes('N40d56.811')).to.be.true;
                // expect(ILatLong.isDegreesMinutes('W076d37.037')).to.be.true;
                // expect(ILatLong.isDegreesMinutes('W076d37m02.20')).to.be.false;
                // expect(ILatLong.isDegreesMinutes('W122d03.84m0')).to.be.false;
                // expect(ILatLong.isDegreesMinutes(40.94684722)).to.be.false;
                // expect(ILatLong.isDegreesMinutes(-40.94684722)).to.be.false;
            });
        })
    });

    describe('.isDecimalDegreesStr()', () => {
        describe('when passed a valid Latitude', () => {
            it('should return true when passed value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LATITUDE', '40.94684722')).to.be.true;
            });

            it('should return true when passed negative value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LATITUDE', '-40.94684722')).to.be.true;
            });

            it('should return true when passed value with `N` letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LATITUDE', 'N40.94684722')).to.be.true;
            });

            it('should return true when passed value with `S` letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LATITUDE', 'S40.94684722')).to.be.true;
            });
        });

        describe('when passed a valid Longitude', () => {
            it('should return true when passed value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LONGITUDE', '120.94684722')).to.be.true;
            });

            it('should return true when passed negative value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LONGITUDE', '-120.94684722')).to.be.true;
            });

            it('should return true when passed value with `E` letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LONGITUDE', 'E90.94684722')).to.be.true;
            });

            it('should return true when passed value with `W` letter prefix', () => {
                expect(ILatLong.isDecimalDegreesStr('LONGITUDE', 'W40.94684722')).to.be.true;
            });
        });
    });

    describe('.isDecimalDegreesNumber()', () => {
        it('should return true when passed valid data', () => {
            expect(ILatLong.isDecimalDegreesNumber('LATITUDE', 40.94684722)).to.be.true;
            expect(ILatLong.isDecimalDegreesNumber('LATITUDE', -40.94684722)).to.be.true;
        });
    });

    // describe('.isDecimalDegrees()', () => {
    //     it('should return true when passed valid data', () => {
    //         expect(ILatLong.isDegreesMinutesSeconds(40.94684722)).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds(-40.94684722)).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('40.94684722')).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('-40.94684722')).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('N40.94684722')).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('S40.94684722')).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('W76.61727778')).to.be.true;
    //         expect(ILatLong.isDegreesMinutesSeconds('e76.61727778')).to.be.true;
    //     });
    // });
});
