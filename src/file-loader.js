const {readFileSync , statSync,readdirSync} = require('fs');
const {relative,extname} = require('path');
const {EventEmitter} = require('events');

class PathReadResult{

}
class FileLoader extends EventEmitter{
    constructor({base,maxFileSize}){
        super();
        this.maxFileSize = typeof maxFileSize == 'number' ? maxFileSize : 10000 ;
        this.base = base || process.cwd();
    }
    resolvePath(filepath){
        const stat = statSync(filepath);
        const pathReadResult = new PathReadResult;
        try{
            if (stat.isDirectory()){
                pathReadResult.dirpath = dirpath;
                pathReadResult.isDirectory = true;
            }
            else if (stat.isFile()){
                pathReadResult.filepath = filepath;
                pathReadResult.ext = extname;
                pathReadResult.isFile = true;
                pathReadResult.fileSize = stat.size;
            }
        }
        catch(err){
            pathReadResult.error = err;
        }
        return pathReadResult;
    }
    readFile({filepath,fileSize}){
        if (fileSize>this.maxFileSize){
            this.emit('fileSkip' , {
                filepath
            })
            return '';
        }
        const content = readFileSync(filepath);
        this.emit('fileRead' , {
            filepath,
            content 
        })
        return content;
    }
    readDir(filepath){
        return readdirSync(filepath);
    }
   

    getAbsPath(
        filepath
    ){
        return relative(this.base , filepath);
    }
}

module.exports = {
    FileLoader,
    PathReadResult
}