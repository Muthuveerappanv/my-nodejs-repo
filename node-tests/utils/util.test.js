const util = require('./util');
const expect = require('expect');

describe('Utils', () => {

    describe('#add', () => {
        it('Should add two numbers', () => {
            var out = util.add(80, 4);
            expect(out).toBe(84);
            expect(typeof out).toBe('number');
        })
    
        it('Should async add two numbers', (done) => {
            var out = util.asyncadd(80, 4, sum => {
                expect(sum).toBe(84);
                done();
            })
        })
    });
    
    describe('#square', () => {
        it('Should square two numbers', () => {
            var out = util.square(8);
            if (out !== 64) {
                throw new Error(`Expected 64 got ${out}`);
            }
        })
    
        it('Should async square two numbers', (done) => {
            var out = util.asyncSquare(8, square => {
                expect(square).toBe(64);
                done();
            });
        });
    });
   
});




it('test tonot be', () => {
    //expect(12).toNotBe(12);
    //expect([3,4,5]).toInclude(4);
    expect({ name: 'Muthu', age: 26 }).toInclude({ age: 26 });
})


it('test split name', () => {
    var user = { 'age': 26, sex: 'M' };
    user = util.setName(user, 'Muthu Veerappan');
    expect(user.fname).toEqual('Muthu');
    expect(user).toInclude({ fname: 'Muthu' });
})