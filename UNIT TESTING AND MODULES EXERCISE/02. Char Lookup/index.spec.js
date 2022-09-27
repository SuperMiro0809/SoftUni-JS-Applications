const lib = require('./index');
const expect = require('chai').expect;

describe('lookupChar tests', function () {
    it('should return undefined if the first param is not a string', function () {
        const stringTest = 3;
        const result = lib.lookupChar(stringTest, 0);
        expect(result).to.be.undefined;
    });

    it('should return undefined if the second param is not a number', function () {
        const indexTest = 'test';
        const result = lib.lookupChar('str', indexTest);
        expect(result).to.be.undefined;
    });

    it('should return undefined if the index is a floating-oint number', function () {
        const indexTest = 1.12;
        const result = lib.lookupChar('test', indexTest);
        expect(result).to.be.undefined;
    });

    it('should return incorrect index if the index is bigger than the string length', function () {
        const indexTest = 5;
        const result = lib.lookupChar('test', indexTest);
        expect(result).to.eq('Incorrect index');
    });

    it('should return incorrect index if the index is equal to the string length', function () {
        const indexTest = 4;
        const result = lib.lookupChar('test', indexTest);
        expect(result).to.eq('Incorrect index')
    });

    it('should return incorrect index if the index is a negative number', function () {
        const indexTest = -1;
        const result = lib.lookupChar('test', indexTest);
        expect(result).to.eq('Incorrect index');
    });

    it('should return the correct result with right params', function () {
        const str = 'test';
        const index = 1;
        const result = lib.lookupChar(str, index);
        expect(result).to.eq('e')
    })
})