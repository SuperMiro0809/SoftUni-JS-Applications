const lib = require('./index');
//const { expect } = require('chai');
const expect = require('chai').expect;

describe('rgb to hex test', function () {
    it('should return undefind when first arg not an int', function () {
        const input = ['test', 255, 255];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });

    it('should return undefind when first arg not an int', function () {
        const input = [255, 'test', 255];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });

    it('should return undefind when first arg not an int', function () {
        const input = [255, 255, 'test'];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });

    it('should convert rgb to hex', function () {
        const input = [252, 186, 3];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq('#FCBA03');
    })
})
