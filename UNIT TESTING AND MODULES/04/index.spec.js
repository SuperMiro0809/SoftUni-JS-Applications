const lib = require('./index');
//const { expect } = require('chai');
const expect = require('chai').expect;

describe('CreateCaculator tests', function () {
    it('should create calculator successfuly', function () {
        const result = lib.createCalculator();
        expect(result).to.exist;
        expect(result.get()).to.eq(0);
    });

    it('should test calculator add', function () {
        const result = lib.createCalculator();
        result.add(5);
        expect(result.get()).to.eq(5);
    });

    it('should test calculator add and substract', function () {
        const result = lib.createCalculator();
        result.add(10);
        result.subtract(3)
        expect(result.get()).to.eq(7);
    });
})