const {FileTrace} = require('./files-trace-core');

module.exports = {
    trace
}

function trace({base ,fileLoader,filePath }){
    const ft = new FileTrace({
        base,
        fileLoader
    });
    ft.trace(filePath);
   return ft.traces;
}
