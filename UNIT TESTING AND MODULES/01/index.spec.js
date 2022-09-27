const lib = require('./index');
//const { expect } = require('chai');
const expect = require('chai').expect;

describe('Sum tests', function () {
    it('should return NaN when input is string', function () {
        const input = 'test';
        const result = lib.sum(input);
        expect(result).to.be.NaN;
    });

    it('should return number with input of array with string', function () {
        const input = ['1', '2'];
        const result = lib.sum(input);
        expect(result).to.eq(3);
    });

    it('test correct sum', function () {
        const input = [1, 2, 3];
        const result = lib.sum(input);
        expect(result).to.eq(6);
    })
});