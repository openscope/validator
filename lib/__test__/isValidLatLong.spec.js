'use strict'

const expect = require('chai').expect;
const isValidLatLong = require('../isValidLatLong');

describe('.isValidLatLong()', () => {
    describe('when incorrect data is passed', () => {
        it('should return false', () => expect(isValidLatLong([])).to.be.false);
    });

    describe('when valid data is passed', () => {
        it('should return true', () => {
            const validLatLongMock = ["N47.83333330", "W121.69999940"];
            const result = isValidLatLong(validLatLongMock);

            expect(result).to.be.true;
        });
    });

    describe('when malformed lat/long is passed', () => {
        it('should return false', () => {
            const latLongMock = ["N47.83333330", "W200"];
            const result = isValidLatLong(latLongMock);

            expect(result).to.be.false;
        });
    });
});
