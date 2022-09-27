const lib = require('./index');
const expect = require('chai').expect;

describe('Math Enforcer tests', function () {
    describe('AddFive tests', function () {
        it('should return undefined it the param is not a number', function () {
            const input = 'test';
            const result = lib.mathEnforcer.addFive(input);
            expect(result).to.be.undefined;
        });

        it('should return the correct result with a number', function () {
            const input = 3;
            const result = lib.mathEnforcer.addFive(input);
            expect(result).to.eq(8);
        });

        it('should return the correct result with negative number', function () {
            const input = -1;
            const result = lib.mathEnforcer.addFive(input);
            expect(result).to.eq(4);
        });

        it('should return the correct result with floating-point number', function () {
            const input = 1.5;
            const result = lib.mathEnforcer.addFive(input);
            expect(result).to.eq(6.5);
        });

    });

    describe('subtractTen tests', function () {
        it('should return undefined if the param is not a number', function () {
            const input = 'test';
            const result = lib.mathEnforcer.subtractTen(input);
            expect(result).to.be.undefined;
        });

        it('should return the correct result if the param is a number', function () {
            const input = 15;
            const result = lib.mathEnforcer.subtractTen(input);
            expect(result).to.eq(5);
        });  

        it('should return the correct result with negative number', function () {
            const input = -1;
            const result = lib.mathEnforcer.subtractTen(input);
            expect(result).to.eq(-11);
        });

        it('should return the correct result with floating-point number', function () {
            const input = 1.5;
            const result = lib.mathEnforcer.subtractTen(input);
            expect(result).to.eq(-8.5);
        });

    });

    describe('sum tests', function () {
        it('should return undefined if the first param is not a number', function () {
            const firstParam = 'test';
            const result = lib.mathEnforcer.sum(firstParam, 3);
            expect(result).to.be.undefined;
        });

        it('should return undefined if the second param is not a number', function () {
            const secondParam = 'test';
            const result = lib.mathEnforcer.sum(3, secondParam);
            expect(result).to.be.undefined;
        });

        it('should return the correct result with the right params', function () {
            const firstParam = 3;
            const secondParam = 1;
            const result = lib.mathEnforcer.sum(firstParam, secondParam);
            expect(result).to.eq(4);
        });

        it('should return the correct result with negative numbers', function () {
            const firstParam = -1;
            const secondParam = -2;
            const result = lib.mathEnforcer.sum(firstParam, secondParam);
            expect(result).to.eq(-3);
        });

        it('should return the correct result with floating-point numbers', function () {
            const firstParam = 1.5;
            const secondParam = 2.5;
            const result = lib.mathEnforcer.sum(firstParam, secondParam);
            expect(result).to.eq(4);
        });
    })
})