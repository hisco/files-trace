const {MessageBase} = require('./message-base');

class MessageA extends MessageBase{
    constructor(){
        super();
        this.name = `I'm most likely used only in service A`;
    }
}

throw new Error(`proof that it's not being required or something wierd like that..`)
module.exports = {
    MessageA
}