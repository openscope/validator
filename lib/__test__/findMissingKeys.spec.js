'use strict'

const expect = require('chai').expect;
const findMissingKeys = require('../findMissingKeys');

const keysMock = [
    'angle',
    'speed'
];
const moreKeysMock = [
    ...keysMock,
    'threeve'
];
const objMock = {
    angle: 150,
    speed: 9
};

describe('.findAllMissingKeys()', () => {
    describe('when keys are not missing in obj', () => {
        it('should return an empty array', () => {
            const result = findMissingKeys(keysMock, objMock);

            expect(Array.isArray(result)).to.be.true;
            expect(result.length).to.eq(0);
        });
    });

    describe('when keys are missing in obj', () => {
        it('should return an array of missing keys', () => {
            const objMock = { speed: 9 };
            const expectedResult = ['angle'];
            const result = findMissingKeys(keysMock, objMock);

            expect(result.length).to.eq(1);
            expect(result).to.deep.eq(expectedResult);
        });
    });

    describe('when there are more keys than obj keys', () => {
        it('should return an array of additional keys', () => {
            const expectedResult = ['threeve'];
            const result = findMissingKeys(moreKeysMock, objMock);

            expect(result.length).to.eq(1);
            expect(result).to.deep.eq(expectedResult);
        });
    });
});
