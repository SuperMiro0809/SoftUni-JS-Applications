const lib = require('./index');
const expect = require('chai').expect;

describe('Odd or Even tests', function () {
    it('should return undefined if param is a number', function () {
        const input = 3;
        const result = lib.isOddOrEven(input);
        expect(result).to.be.undefined;
    });

    it('should return undefined if param is an object', function () {
        const input = {test: 'test'};
        const result = lib.isOddOrEven(input);
        expect(result).to.be.undefined;
    })

    it('should return even if the length of the string is an even number', function () {
        const input = 'test';
        const result = lib.isOddOrEven(input);
        expect(result).to.eq('even');
    });

    it('should return odd if the length of the string is an odd number', function () {
        const input = 'hello';
        const result = lib.isOddOrEven(input);
        expect(result).to.eq('odd');
    });

    it('should return correct result wih multiple params', function () {
        const firstInput = 'test';
        const secondInput = 'hello';
        const thirtInput = 'world';
        const fourthInput = 'js';

        const firstResult = lib.isOddOrEven(firstInput);
        const secondResult = lib.isOddOrEven(secondInput);
        const thirtResult = lib.isOddOrEven(thirtInput);
        const fourthResult = lib.isOddOrEven(fourthInput);

        expect(firstResult).to.eq('even');
        expect(secondResult).to.eq('odd');
        expect(thirtResult).to.eq('odd');
        expect(fourthResult).to.eq('even');
    })
})