const lib = require('./index');
const expect = require('chai').expect;


describe('StringBuilder tests', function () {
    describe('Append tests', function () {
        it('should make the the correct _stringArray if the param is a string', function () {
            let str = new lib.StringBuilder('hello');
            const input = ', there';
            str.append(input);
            expect(str._stringArray.join('')).to.eq('hello, there');
        });

        it('should throw error if the param is not a string', function () {
            // let str = new lib.StringBuilder('hello');
            const input = 1;   
            expect(() => new lib.StringBuilder(input)).to.throw('Argument must be string');
        });
    });

    describe('Prepend tests', function () {
        it('should make the the correct _stringArray if the param is a string', function () {
            let str = new lib.StringBuilder('hello');
            const input = 'User, ';
            str.prepend(input);
            expect(str._stringArray.join('')).to.eq('User, hello');
        });
        
        it('should throw error if the param is not a string', function () {
            // let str = new lib.StringBuilder('hello');
            const input = 1;   
            expect(() => new lib.StringBuilder(input)).to.throw('Argument must be string');
        });
    });

    describe('insertAt tests', function () {
        it('should make the the correct _stringArray if the param is a string', function () {
            let str = new lib.StringBuilder('hello');
            const strParam = 'woop';
            const index = 5;
            str.insertAt(strParam, index);
            expect(str._stringArray.join('')).to.eq('hellowoop') 
        });

        it('should throw error if the param is not a string', function () {
            // let str = new lib.StringBuilder('hello');
            const input = 1;   
            expect(() => new lib.StringBuilder(input)).to.throw('Argument must be string');
        });
    });

    describe('Remove tests', function () {
        it('should make the the correct _stringArray if the param is a string', function () {
            let str = new lib.StringBuilder('hello');
            str.append(', there');
            str.prepend('User, ');
            str.insertAt('woop',5 );
            str.remove(6, 3);
            expect(str._stringArray.join('')).to.eq('User,w hello, there');
        });

        it('should throw error if the param is not a string', function () {
            // let str = new lib.StringBuilder('hello');
            const input = 1;   
            expect(() => new lib.StringBuilder(input)).to.throw('Argument must be string');
        });
    });

    describe('toString tests', function () {
        it('should return the the correct _stringArray if the param is a string', function () {
            let str = new lib.StringBuilder('hello');
            str.append(', there');
            str.prepend('User, ');
            str.insertAt('woop',5 );
            str.remove(6, 3);
            const result = str.toString();
            expect(result).to.eq('User,w hello, there');
        });

        it('should throw error if the param is not a string', function () {
            // let str = new lib.StringBuilder('hello');
            const input = 1;   
            expect(() => new lib.StringBuilder(input)).to.throw('Argument must be string');
        });
    })
})

