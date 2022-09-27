const lib = require('./index');
const expect = require('chai').expect;

describe('Payment Packge tests', function () {
    const validName = 'My package';
    const validValue = 120;

    describe('Instantiation and structure', function () {
        it('works with valid parameters', function () {
            expect(() => new lib.PaymentPackage(validName,validValue)).to.not.throw;
        });

        it('is  correctly set up', function () {
            const instance = new lib.PaymentPackage(validName,validValue);
            expect(instance.name).to.eq(validName);
            expect(instance.value).to.eq(validValue);
            expect(instance.VAT).to.eq(20);
            expect(instance.active).to.be.true;
        });

        it('does not work with invalid name', function () {
            expect(() => new lib.PaymentPackage('',validValue)).to.throw('Name must be a non-empty string');
            expect(() => new lib.PaymentPackage(undefined,validValue)).to.throw('Name must be a non-empty string');
            expect(() => new lib.PaymentPackage({},validValue)).to.throw('Name must be a non-empty string');
        });

        it('does not work with invalid value', function () {
            expect(() => new lib.PaymentPackage(validName,'')).to.throw('Value must be a non-negative number');
            expect(() => new lib.PaymentPackage(validName,-5)).to.throw('Value must be a non-negative number');
            expect(() => new lib.PaymentPackage(validName,undefined)).to.throw('Value must be a non-negative number');
        });

        it('has all properties', function () {
            const instance = new lib.PaymentPackage(validName, validValue);

            expect(instance).to.have.property('name');
            expect(instance).to.have.property('value');
            expect(instance).to.have.property('VAT');
            expect(instance).to.have.property('active');
        });
    });

    describe('Accessors test', function () {
        let instance = null;
        beforeEach(() => {
            instance = new lib.PaymentPackage(validName, validValue);
        });

        it('accepts and sets valid name', function () {
            expect(() => instance.name = 'New Package').to.not.throw('Name must be a non-empty string');
            expect(instance.name).to.eq('New Package');
        });

        it('rejects invalid name', function () {
            expect(() => instance.name = '').to.throw('Name must be a non-empty string');
            expect(() => instance.name = undefined).to.throw('Name must be a non-empty string');
            expect(() => instance.name = {}).to.throw('Name must be a non-empty string');
        });

        it('accepts and sets valid value', function () {
            expect(() => instance.value = 5).to.not.throw('Value must be a non-negative number');
            expect(instance.value).to.eq(5);
        });

        it('rejects invalid value', function () {
            expect(() => instance.value = '').to.throw('Value must be a non-negative number');
            expect(() => instance.value = -5).to.throw('Value must be a non-negative number');
            expect(() => instance.value = {}).to.throw('Value must be a non-negative number');
        });

        it('accepts and sets valid VAT', function () {
            expect(() => instance.VAT = 30).to.not.throw('VAT must be a non-negative number');
            expect(instance.VAT).to.eq(30);
        });

        it('rejects invalid VAT', function () {
            expect(() => instance.VAT = '').to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = -5).to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = {}).to.throw('VAT must be a non-negative number');
        });

        it('accepts and sets valid active', function () {
            expect(() => instance.active = true).to.not.throw('Active status must be a boolean');
            expect(instance.active).to.be.true;

            expect(() => instance.active = false).to.not.throw('Active status must be a boolean');
            expect(instance.active).to.be.false;
        });

        it('rejects invalid active', function () {
            expect(() => instance.active = '').to.throw('Active status must be a boolean');
            expect(() => instance.active = undefined).to.throw('Active status must be a boolean');
            expect(() => instance.active = {}).to.throw('Active status must be a boolean');
        });
    });

    describe('String info', function () {
        let instance = null;
        beforeEach(() => {
            instance = new lib.PaymentPackage(validName, validValue);
        });

        it('contains the name', function () {
            expect(instance.toString()).to.contain(validName);
        });

        it('contains the value', function () {
            expect(instance.toString()).to.contain(validValue.toString());
        });

        it('contains the VAT', function () {
            expect(instance.toString()).to.contain(instance.VAT + '%');
        });

        it('displays inactive label', function () {
            instance.active = false;

            expect(instance.toString()).to.contain('(inactive)')
        });

        it('updates info through setters', function () {
            instance.name = 'Package';
            instance.value = 80;
            instance.VAT = 10;

            const output = instance.toString();

            expect(output).to.contain('Package');
            expect(output).to.contain('80');
            expect(output).to.contain('10%');
        })
    });
})