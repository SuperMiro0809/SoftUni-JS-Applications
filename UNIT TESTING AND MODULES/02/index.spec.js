const lib = require('./index');
//const { expect } = require('chai');
const expect = require('chai').expect;

describe('isSymeric tests', function () {
    it('false if input is not an array is not symmetric', function () {
        const input = 'test';
        const result = lib.isSymmetric(input);
        expect(result).to.be.false;
    });

    it('should not be symmetric', function () {
        const input = [1,2,3];
        const result = lib.isSymmetric(input);
        expect(result).to.be.false;
    });

    it('should be symmetric', function () {
        const input = [1, 1, 1];
        const result = lib.isSymmetric(input);
        expect(result).to.be.true;
    });
})