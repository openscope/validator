'use strict';

const expect = require('chai').expect;
const ILatLong = require('../i-lat-long');

describe('ILatLong', () => {
    describe('LatitudeDegreeValueType', () => {
        it('returns false for a numeric string greater than 90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is('100.003')).to.be.false;
        });

        it('returns false for a number greater than 90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is(90.003)).to.be.false;
        });

        it('returns false for a negitive number less than -90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is(-90.003)).to.be.false;
        });

        it('returns true for a numeric string less than 90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is('40.003')).to.be.true;
        });

        it('returns true for a number less than 90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is(40.003)).to.be.true;
        });

        it('returns true for a negitive number greater than -90', () => {
            expect(ILatLong.LatitudeDegreeValueType.is(-40.003)).to.be.true;
        });
    });

    describe('LongitudeDegreeValueType', () => {
        it('returns false for a numeric string greater than 180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is('180.003')).to.be.false;
        });

        it('returns false for a number greater than 180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is(190.003)).to.be.false;
        });

        it('returns false for a negitive number less than -180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is(-180.003)).to.be.false;
        });

        it('returns true for a numeric string less than 180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is('40.003')).to.be.true;
        });

        it('returns true for a number less than 180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is(40.003)).to.be.true;
        });

        it('returns true for a negitive number greater than -180', () => {
            expect(ILatLong.LongitudeDegreeValueType.is(-40.003)).to.be.true;
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

    describe('.hasLatitudeCardinalPrefix()', () => {
        it('should return false when passed string without a cardinal prefix', () => {
            expect(ILatLong.hasLatitudeCardinalPrefix('40.00')).to.be.false;
        });

        it('should return false when passed string with a longitude cardinal prefix', () => {
            expect(ILatLong.hasLatitudeCardinalPrefix('W40.00')).to.be.false;
        });

        it('should return true when passed string with a latitude cardinal prefix', () => {
            expect(ILatLong.hasLatitudeCardinalPrefix('N40.00')).to.be.true;
        });
    });

    describe('.hasLongitudeCardinalPrefix()', () => {
        it('should return false when passed string without a cardinal prefix', () => {
            expect(ILatLong.hasLongitudeCardinalPrefix('170.00')).to.be.false;
        });

        it('should return false when passed string with a latitude cardinal prefix', () => {
            expect(ILatLong.hasLongitudeCardinalPrefix('N40.00')).to.be.false;
        });

        it('should return true when passed string with a latitude cardinal prefix', () => {
            expect(ILatLong.hasLongitudeCardinalPrefix('E170.00')).to.be.true;
        });
    });

    describe('.isDegreesMinutesSeconds()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed a string with `n`, `d` and `m`', () => {
                expect(ILatLong.isDegreesMinutesSeconds('N47d34.80m0')).to.be.true;
            });

            it('should return true when passed a string with a `0` value for degrees', () => {
                expect(ILatLong.isDegreesMinutesSeconds('W0d12m45.87')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed a number', () => {
                expect(ILatLong.isDegreesMinutesSeconds(40.94684722)).to.be.false;
            });

            it('should return true when passed a negative number', () => {
                expect(ILatLong.isDegreesMinutesSeconds(-40.94684722)).to.be.false;
            });
        });
    });

    describe('.isDegreesMinutes()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed a string with direction and `d`', () => {
                expect(ILatLong.isDegreesMinutes('N40d56.811')).to.be.true;
            });

            it('should return true when passed valid data', () => {
                expect(ILatLong.isDegreesMinutes('W076d37.037')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed a string with direction `d` and `m`', () => {
                expect(ILatLong.isDegreesMinutes('W076d37m02.20')).to.be.false;
            });

            it('should return false when passed a number', () => {
                expect(ILatLong.isDegreesMinutes(40.94684722)).to.be.false;
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
        describe('when passed valid data', () => {
            it('should return true when passed a positive number latitude', () => {
                expect(ILatLong.isDecimalDegreesNumber('LATITUDE', 40.94684722)).to.be.true;
            });

            it('should return true when passed a negative number latitude', () => {
                expect(ILatLong.isDecimalDegreesNumber('LATITUDE', -40.94684722)).to.be.true;
            });

            it('should return true when passed a positive number longitude', () => {
                expect(ILatLong.isDecimalDegreesNumber('LONGITUDE', 40.94684722)).to.be.true;
            });

            it('should return true when passed a negative number longitude', () => {
                expect(ILatLong.isDecimalDegreesNumber('LONGITUDE', -40.94684722)).to.be.true;
            });
        });

        it('should return false when passed invalid data', () => {
            expect(ILatLong.isDecimalDegreesNumber(1234)).to.be.false;
        });
    });

    describe('.isDecimalDegrees()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed a positive number', () => {
                expect(ILatLong.isDecimalDegrees('LATITUDE', 40.94684722)).to.be.true;
            });

            it('should return true when passed a positive number as a string', () => {
                expect(ILatLong.isDecimalDegrees('LATITUDE', '40.94684722')).to.be.true;
            });

            it('should return true when passed a negative number', () => {
                expect(ILatLong.isDecimalDegrees('LATITUDE', -40.94684722)).to.be.true;
            });

            it('should return true when passed a number as a string with a direction prefix', () => {
                expect(ILatLong.isDecimalDegrees('LONGITUDE', 'N40.94684722')).to.be.true;
            });

            it('should return true when passed a number as a string with a lowercase direction prefix', () => {
                expect(ILatLong.isDecimalDegrees('LONGITUDE', 'e76.61727778')).to.be.true;
            });
        });
    });

    describe('.isLatLongWithElevation()', () => {
        it('returns true when passed a 3 index array', () => {
            expect(ILatLong.isLatLongWithElevation([42.354662, -70.991598, '100ft'])).to.be.true;
        });

        it('returns false when passed a 2 index array', () => {
            expect(ILatLong.isLatLongWithElevation([42.354662, -70.991598])).to.be.false;
        });

        it('returns false when passed invalid data', () => {
            expect(ILatLong.isLatLongWithElevation()).to.be.false;
        });
    });

    describe('.isValidElevation', () => {
        it('should returns true when passed a string with `ft` suffix', () => {
            expect(ILatLong.isValidElevation('123ft')).to.be.true;
        });
    });

    describe('LatitudeDegreeMinuteSecondType', () => {
        describe('when passed valid data', () => {
            it('should return true', () => {
                expect(ILatLong.LatitudeDegreeMinuteSecondType.is('N076d37m02.20')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute data', () => {
                expect(ILatLong.LatitudeDegreeMinuteSecondType.is('N076d37.037')).to.be.false;
            });

            it('should return false when passed decimal degree data', () => {
                expect(ILatLong.LatitudeDegreeMinuteSecondType.is('N76.61727778')).to.be.false;
            });

            it('should return false when passed decimal degree longitude data', () => {
                expect(ILatLong.LatitudeDegreeMinuteSecondType.is('W076d37m02.20')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LatitudeDegreeMinuteSecondType.is({})).to.be.false;
            });
        });
    });

    describe('LatitudeDegreeMinuteType', () => {
        describe('when passed valid data', () => {
            it('should return true', () => {
                expect(ILatLong.LatitudeDegreeMinuteType.is('N40d56.811')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute seconds data', () => {
                expect(ILatLong.LatitudeDegreeMinuteType.is('N076d37m02.20')).to.be.false;
            });

            it('should return false when passed decimal degree data', () => {
                expect(ILatLong.LatitudeDegreeMinuteType.is('N76.61727778')).to.be.false;
            });

            it('should return false when passed decimal degree longitude data', () => {
                expect(ILatLong.LatitudeDegreeMinuteType.is('E40d56.811')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LatitudeDegreeMinuteType.is({})).to.be.false;
            });
        });
    });

    describe.only('LatitudeDecimalDegreeType', () => {
        describe('when passed valid data', () => {
            it('should return true with a string number', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is('40.94684722')).to.be.true;
            });

            it('should return true with a positive number', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is(40.94684722)).to.be.true;
            });

            it('should return true with a negitive number', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is(-40.94684722)).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute seconds data', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is('N076d37m02.20')).to.be.false;
            });

            it('should return false when passed degree minute data', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is('N40d56.811')).to.be.false;
            });

            it('should return false when passed decimal degree longitude data', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is('W76.61727778')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LatitudeDecimalDegreeType.is({})).to.be.false;
            });
        });
    });

    describe('LongitudeDegreeMinuteSecondType', () => {
        describe('when passed valid data', () => {
            it('should return true', () => {
                expect(ILatLong.LongitudeDegreeMinuteSecondType.is('E076d37m02.20')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute data', () => {
                expect(ILatLong.LongitudeDegreeMinuteSecondType.is('W076d37.037')).to.be.false;
            });

            it('should return false when passed decimal degree data', () => {
                expect(ILatLong.LongitudeDegreeMinuteSecondType.is('W76.61727778')).to.be.false;
            });

            it('should return false when passed decimal degree longitude data', () => {
                expect(ILatLong.LongitudeDegreeMinuteSecondType.is('S076d37m02.20')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LongitudeDegreeMinuteSecondType.is({})).to.be.false;
            });
        });
    });

    describe('LongitudeDegreeMinuteType', () => {
        describe('when passed valid data', () => {
            it('should return true', () => {
                expect(ILatLong.LongitudeDegreeMinuteType.is('W076d37.037')).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute seconds data', () => {
                expect(ILatLong.LongitudeDegreeMinuteType.is('W76d37m02.20')).to.be.false;
            });

            it('should return false when passed decimal degree data', () => {
                expect(ILatLong.LongitudeDegreeMinuteType.is('W76.61727778')).to.be.false;
            });

            it('should return false when passed decimal degree latitude data', () => {
                expect(ILatLong.LongitudeDegreeMinuteType.is('N40d56.811')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LongitudeDegreeMinuteType.is({})).to.be.false;
            });
        });
    });

    // describe('LongitudeDecimalDegreeType', () => {});

    // describe('LatitudeType', () => {});

    // describe('LongitudeType', () => {});

    // describe('ElevationType', () => {});
});

