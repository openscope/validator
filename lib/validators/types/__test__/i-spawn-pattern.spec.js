'use strict';

const expect = require('chai').expect;
const ISpawnPattern = require('../i-spawn-pattern').ISpawnPattern;

const validArrivalMock = {
    origin: '',
    destination: 'ksea',
    category: 'arrival',
    route: 'PDT.CHINS3.KSEA16R',
    altitude: [18000, 36000],
    speed: 320,
    method: 'random',
    rate: 15,
    airlines: [
        ['aal', 4.05],
        ['aca', 0.95],
        ['asa', 32.09],
        ['baw/long', 0.28]
    ]
};

const validDepartureMock = {
    origin: 'ksea',
    destination: '',
    category: 'departure',
    route: 'KSEA16L.HAROB6.HISKU',
    altitude: '',
    speed: '',
    method: 'random',
    rate: 1.75,
    airlines: [
        ['aal', 4.05],
        ['aca', 0.95],
        ['asa', 32.09]
    ]
};

const invalidDepartureMock = {
    origin: 'ksea',
    destination: '',
    category: 'departure',
    route: 'KSEA16L.HAROB6.HISKU',
    altitude: '',
    speed: '',
    method: 'threeve',
    rate: '1.75',
    airlines: [
        ['aal', 4.05],
        ['aca', 0.95],
        ['asa', 32.09]
    ]
};

describe('ISpawnPattern', () => {
    it('throws with invalid data', () => {
        expect(() => new ISpawnPattern()).to.throw();
        expect(() => new ISpawnPattern(invalidDepartureMock)).to.throw();
    });

    it('does not throw with valid data', () => {
        expect(() => ISpawnPattern(validArrivalMock)).to.not.throw();
        expect(() => ISpawnPattern(validDepartureMock)).to.not.throw();
    });
});

