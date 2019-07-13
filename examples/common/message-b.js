const {MessageBase} = require('./message-base');

class MessageB extends MessageBase{
    constructor(){
        super();
        this.name = `I'm most likely used only in service B`;
    }
}
throw new Error(`proof that it's not being required or something wierd like that..`)

module.exports = {
    MessageB
}