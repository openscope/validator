'use strict';

const expect = require('chai').expect;
const ProcedureRouteType = require('../procedure-route-type');

describe('ProcedureRouteType', () => {
    it('should throw when not a string', () => {
        expect(() => new ProcedureRouteType(false)).to.throw();
    });

    describe('when passed a string', () => {
        it('should not throw when passed a string of correct shape', () => {
            expect(() => new ProcedureRouteType('a.b.c')).to.throw();
        });

        it('should throw when passed a string of wrong shape', () => {
            expect(() => new ProcedureRouteType('a')).to.throw();
            expect(() => new ProcedureRouteType('a.b')).to.throw();
            expect(() => new ProcedureRouteType('a.b.c.d')).to.throw();
        });
    });
});
