const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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

    it('should generate correct location object', () => {
        var from = 'lyes';
        var url = 'https://www.google.com/maps/?q=1,1'
        var locationMessage = generateLocationMessage('lyes',1,1);

        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({
            from,
            url
        });
    });
})
