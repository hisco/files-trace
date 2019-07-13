
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));

const {
    trace
} = require('../../src/files-trace');

function getServiceRequireNames(traceResults , key){
    const requires = (traceResults[key] || {}).requires;
    if (requires){
        return requires.map(d => d.name);
    }
    return []
}
const EXAMPLES_FOLDER = `${__dirname}/../../examples`;
describe('files-trace', ()=> {
    describe('trace' , ()=>{
        it('Should trace service a' , ()=>{
            const traceResult = trace({
                base: EXAMPLES_FOLDER,
                filePath:`${EXAMPLES_FOLDER}/service-a/service-a.js`
            });
            const serviceARequire = getServiceRequireNames(traceResult,'service-a/service-a.js');
            expect(serviceARequire).to.deep.eq(['common/message-a']);
            const messageARequire = getServiceRequireNames(traceResult,'common/message-a');
            expect(messageARequire).to.deep.eq(['common/message-base']);
        });
        it('Should trace service b' , ()=>{
            const traceResult = trace({
                base:EXAMPLES_FOLDER,
                filePath:`${EXAMPLES_FOLDER}/service-b/service-b.js`
            });
            const serviceARequire = getServiceRequireNames(traceResult,'service-b/service-b.js');
            expect(serviceARequire).to.deep.eq(['common/message-b']);
            const messageARequire = getServiceRequireNames(traceResult,'common/message-b');
            expect(messageARequire).to.deep.eq(['common/message-base']);
        })
    })
});