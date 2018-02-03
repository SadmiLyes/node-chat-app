const expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Lyes', text = 'some message';
        var message = generateMessage('Lyes', 'some message');

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });


    });
})