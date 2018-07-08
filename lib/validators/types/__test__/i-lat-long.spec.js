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

    describe('.hasDecimalDegreeSymbol()', () => {
        it('should return false when passed data that does not contain the `D` symbol', () => {
            expect(ILatLong.hasDecimalDegreeSymbol('W076.037')).to.be.false;
        });

        it('should return true when passed data that contains the `D` symbol', () => {
            expect(ILatLong.hasDecimalDegreeSymbol('W076d37.037')).to.be.true;
        });

        it('should return true when passed data that contains the `D` symbol and others', () => {
            expect(ILatLong.hasDecimalDegreeSymbol('N51d32m17.76')).to.be.true;
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

    describe('.isLatitudeDecimalDegreeStr()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed a `N` latitude with cardinal prefix', () => {
                expect(ILatLong.isLatitudeDecimalDegreeStr('N40.94684722')).to.be.true;
            });

            it('should return true when passed a `S` latitude with cardiSal prefix', () => {
                expect(ILatLong.isLatitudeDecimalDegreeStr('S40.94684722')).to.be.true;
            });

            it('should return true when passed a latitude number str', () => {
                expect(ILatLong.isLatitudeDecimalDegreeStr('40.94684722')).to.be.true;
            });
        });
    });

    describe('.isLongitudeDecimalDegreeStr()', () => {
        describe('when passed valid data', () => {
            it('should return true when passed an `E` longitude with cardinal prefix', () => {
                expect(ILatLong.isLongitudeDecimalDegreeStr('e40.94684722')).to.be.true;
            });

            it('should return true when passed a `W` longitude with cardiSal prefix', () => {
                expect(ILatLong.isLongitudeDecimalDegreeStr('W40.94684722')).to.be.true;
            });

            it('should return true when passed a longitude number str', () => {
                expect(ILatLong.isLongitudeDecimalDegreeStr('90.94684722')).to.be.true;
            });
        });
    });

    describe('.isDecimalDegreeStr()', () => {
        describe('when passed a Latitude segment', () => {
            describe('and valid data', () => {
                it('should return true when passed value without cardinal letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', '40.94684722')).to.be.true;
                });

                it('should return true when passed negative value without cardinal letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', '-40.94684722')).to.be.true;
                });

                it('should return true when passed value with `N` letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', 'N40.94684722')).to.be.true;
                });

                it('should return true when passed value with `S` letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', 'S40.94684722')).to.be.true;
                });
            });

            describe('and invalid data', () => {
                it('should return false when passed value with `E` letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', 'E40.94684722')).to.be.false;
                });

                it('should return false when passed value with `W` letter prefix', () => {
                    expect(ILatLong.isDecimalDegreeStr('LATITUDE', 'W40.94684722')).to.be.false;
                });
            });
        });

        describe('when passed a valid Longitude', () => {
            it('should return true when passed value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreeStr('LONGITUDE', '120.94684722')).to.be.true;
            });

            it('should return true when passed negative value without cardinal letter prefix', () => {
                expect(ILatLong.isDecimalDegreeStr('LONGITUDE', '-120.94684722')).to.be.true;
            });

            it('should return true when passed value with `E` letter prefix', () => {
                expect(ILatLong.isDecimalDegreeStr('LONGITUDE', 'E90.94684722')).to.be.true;
            });

            it('should return true when passed value with `W` letter prefix', () => {
                expect(ILatLong.isDecimalDegreeStr('LONGITUDE', 'W40.94684722')).to.be.true;
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
                expect(ILatLong.isDecimalDegrees('LONGITUDE', 'N40.94684722')).to.be.false;
            });

            it('should return true when passed a number as a string with a lowercase direction prefix', () => {
                expect(ILatLong.isDecimalDegrees('LONGITUDE', 'e76.61727778')).to.be.true;
            });
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

    describe('LatitudeDecimalDegreeType', () => {
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

    describe('LongitudeDecimalDegreeType', () => {
        describe('when passed valid data', () => {
            it('should return true with a string number', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is('80.94684722')).to.be.true;
            });

            it('should return true with a positive number', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is(90.94684722)).to.be.true;
            });

            it('should return true with a negitive number', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is(-80.94684722)).to.be.true;
            });
        });

        describe('when passed invalid data', () => {
            it('should return false when passed degree minute seconds data', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is('E076d37m02.20')).to.be.false;
            });

            it('should return false when passed degree minute data', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is('E40d56.811')).to.be.false;
            });

            it('should return false when passed decimal degree latitude data', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is('N76.61727778')).to.be.false;
            });

            it('should return false when passed invalid data', () => {
                expect(ILatLong.LongitudeDecimalDegreeType.is({})).to.be.false;
            });
        });
    });

    describe('LatitudeType', () => {
        describe('when passed valid data', () => {
            it('should not throw when passed a decimal degree type as a positive number', () => {
                const decimalDegreeMock = 40.94684722;

                expect(ILatLong.LatitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a negative number', () => {
                const decimalDegreeMock = -40.94684722;

                expect(ILatLong.LatitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a str', () => {
                const decimalDegreeMock = '40.94684722';

                expect(ILatLong.LatitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a str with cardinal direction', () => {
                const decimalDegreeMock = 'N40.94684722';

                expect(ILatLong.LatitudeType('N40.94684722')).to.eql(decimalDegreeMock);
            });
        });

        describe('when passed invalid data', () => {
            it('should return true when passed a decimal degree type as a positive number that is out of range', () => {
                const decimalDegreeMock = 90.94684722;

                expect(() => ILatLong.LatitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a negative number that is out of range', () => {
                const decimalDegreeMock = -90.94684722;

                expect(() => ILatLong.LatitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str that is out of range', () => {
                const decimalDegreeMock = '90.94684722';

                expect(() => ILatLong.LatitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str with a cardinal direction that is out of range', () => {
                const decimalDegreeMock = 'S90.94684722';

                expect(() => ILatLong.LatitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str with an invalid cardinal direction', () => {
                const decimalDegreeMock = 'E40.94684722';

                expect(() => ILatLong.LatitudeType(decimalDegreeMock)).to.throw;
            });
        });
    });

    describe('LongitudeType', () => {
        describe('when passed valid data', () => {
            it('should not throw when passed a decimal degree type as a positive number', () => {
                const decimalDegreeMock = 100.94684722;

                expect(ILatLong.LongitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a negative number', () => {
                const decimalDegreeMock = -100.94684722;

                expect(ILatLong.LongitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a str', () => {
                const decimalDegreeMock = '100.94684722';

                expect(ILatLong.LongitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });

            it('should not throw when passed a decimal degree type as a str with cardinal direction', () => {
                const decimalDegreeMock = 'E100.94684722';

                expect(ILatLong.LongitudeType(decimalDegreeMock)).to.eql(decimalDegreeMock);
            });
        });

        describe('when passed invalid data', () => {
            it('should return true when passed a decimal degree type as a positive number that is out of range', () => {
                const decimalDegreeMock = 180.94684722;

                expect(() => ILatLong.LongitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a negative number that is out of range', () => {
                const decimalDegreeMock = -180.94684722;

                expect(() => ILatLong.LongitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str that is out of range', () => {
                const decimalDegreeMock = '180.94684722';

                expect(() => ILatLong.LongitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str with a cardinal direction that is out of range', () => {
                const decimalDegreeMock = 'E180.94684722';

                expect(() => ILatLong.LongitudeType(decimalDegreeMock)).to.throw;
            });

            it('should return true when passed a decimal degree type as a str with an invalid cardinal direction', () => {
                const decimalDegreeMock = 'N40.94684722';

                expect(() => ILatLong.LongitudeType(decimalDegreeMock)).to.throw;
            });
        });
    });

    describe('ElevationType', () => {
        describe('when passed valid data', () => {
            it('should not throw', () => {
                const validElevationMock = '123ft';

                expect(ILatLong.ElevationType(validElevationMock)).to.eql(validElevationMock);
            });
        });

        describe('when passed invalid data', () => {
            it('should throw', () => {
                const validElevationMock = '123';

                expect(() => ILatLong.ElevationType(validElevationMock)).to.throw;
            });
        });
    });

    describe('LatitudeLongitudeType', () => {
        describe('with valid data', () => {
            it('should not throw when passed decimal degrees as a number', () => {
                const validLatLongMock = [42.354662, -70.991598];

                expect(ILatLong.LatitudeLongitudeType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed decimal degrees as a string', () => {
                const validLatLongMock = ['42.354662', '-70.991598'];

                expect(ILatLong.LatitudeLongitudeType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed degree minutes', () => {
                const validLatLongMock = ['N40d56.811', 'W076d37.037'];

                expect(ILatLong.LatitudeLongitudeType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed degree minutes seconds', () => {
                const validLatLongMock = ['N51d32m17.76', 'W0d12m45.87'];

                expect(ILatLong.LatitudeLongitudeType(validLatLongMock)).to.eql(validLatLongMock);
            });
        });

        describe('with invalid data', () => {
            it('should throw when passed a 3 index array', () => {
                const invalidLatLongMock = ['40', '100', ''];

                expect(() => ILatLong.LatitudeLongitudeType(invalidLatLongMock)).to.throw;
            });

            it('should throw when passed an array of incorrect length', () => {
                const invalidLatLongMock = ['40'];

                expect(() => ILatLong.LatitudeLongitudeType(invalidLatLongMock)).to.throw;
            });

            it('should throw when passed an array greater than 2 length', () => {
                const invalidLatLongMock = ['40', '100', ''];

                expect(() => ILatLong.LatitudeLongitudeType(invalidLatLongMock)).to.throw;
            });
        });
    });

    describe('LatitudeLongitudeElevationType', () => {
        describe('with valid data', () => {
            it('should not throw when passed decimal degrees as a number', () => {
                const validLatLongMock = [42.354662, -70.991598, '123ft'];

                expect(ILatLong.LatitudeLongitudeElevationType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed decimal degrees with cardinal direction', () => {
                const validLatLongMock = ['S42.354662', 'W70.991598', '123ft'];

                expect(ILatLong.LatitudeLongitudeElevationType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed decimal degrees as a string', () => {
                const validLatLongMock = ['42.354662', '-70.991598', '123ft'];

                expect(ILatLong.LatitudeLongitudeElevationType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed degree minutes', () => {
                const validLatLongMock = ['N40d56.811', 'W076d37.037', '123ft'];

                expect(ILatLong.LatitudeLongitudeElevationType(validLatLongMock)).to.eql(validLatLongMock);
            });

            it('should not throw when passed degree minutes seconds', () => {
                const validLatLongMock = ['N51d32m17.76', 'W0d12m45.87', '123ft'];

                expect(ILatLong.LatitudeLongitudeElevationType(validLatLongMock)).to.eql(validLatLongMock);
            });
        });

        describe('with invalid data', () => {
            it('should throw when passed a 3 index array', () => {
                const invalidLatLongMock = ['40', '100', '123ft', ''];

                expect(() => ILatLong.LatitudeLongitudeElevationType(invalidLatLongMock)).to.throw;
            });

            it('should throw when passed an array of incorrect length', () => {
                const invalidLatLongMock = ['40', '100'];

                expect(() => ILatLong.LatitudeLongitudeElevationType(invalidLatLongMock)).to.throw;
            });

            it('should throw when passed an array greater than 3 length', () => {
                const invalidLatLongMock = ['40', '100', '', ''];

                expect(() => ILatLong.LatitudeLongitudeElevationType(invalidLatLongMock)).to.throw;
            });
        });
    });

    describe('LatLongType', () => {
        describe('with valid data', () => {
            it('should not throw when passed a LatitudeLongitudeType', () => {
                const validMock = ['N51d32m17.76', 'W0d12m45.87'];

                expect(ILatLong.LatLongType(validMock)).to.eql(validMock);
            });

            it('should not throw when passed a LatitudeLongitudeElevationType', () => {
                const validMock = ['N51d32m17.76', 'W0d12m45.87', '321ft'];

                expect(ILatLong.LatLongType(validMock)).to.eql(validMock);
            });
        });
    });
});

