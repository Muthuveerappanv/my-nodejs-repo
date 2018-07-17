const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('Test generateMessage output', () => {
    it('test message object', () => {
        var output = generateMessage('Muthu', 'Hi, How are You?');
        expect(output.from).toEqual('Muthu');
        expect(typeof output.createdAt).toBe('number')
    })
})

describe('Test generateLocationMessage output', () => {
    it('test generateLocationMessage object', () => {
        var output = generateLocationMessage('Muthu', 45.333334, 76.333444);
        expect(output.from).toEqual('Muthu');
        expect(output.locationUrl).toContain('https://');
    })
})