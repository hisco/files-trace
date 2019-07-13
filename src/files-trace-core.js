const {extname,dirname,resolve,sep} = require('path');
const {FileLoader , PathReadResult} = require('./file-loader');

const {lookupRules} = require('./lookup-rules');

class FileTraceResult{
    constructor(name){
        this.name = name;
        this.requires = [];
    }
    addRequire(dependency){
        if (!this.requires.includes(dependency.name)){
            this.requires.push(dependency);
        }
    }
}

class Dependency{
    constructor({name,path,type}){
        this.name = name;
        this.path = path;
        this.type = type;
    }
}

class FileTrace{
    constructor({base , fileLoader } = {}){
        if (!base)
            base = process.cwd();
        if (!fileLoader)
            fileLoader = new FileLoader({base});
        this.fileLoader = fileLoader;
        this.traces = {};

    }
    trace(filepath){
        return this.traceChildOf(filepath);
    }
    fileNotFound(name , filepath){
        return new PathReadResult
    }
    resolvePath(name , filepath){
        const dir = dirname(filepath);
        const filename = filepath.replace(dir+sep,'');
        const files = this.fileLoader.readDir(dir);
        const targetFile = files.find(f=>f.includes(filename));
        if (targetFile)
            return this.fileLoader.resolvePath(`${dir}${sep}${targetFile}`);
        else{
            return this.fileNotFound(name , filepath);
        }
    }
    traceChildOf(filepath , relativeMatch, calledByPath){
        const absName = this.fileLoader.getAbsPath(filepath);
        if (this.traces[absName])
            return;

        calledByPath = calledByPath || filepath;
        let fileTraceResult = new FileTraceResult;
        this.traces[absName] = fileTraceResult;

        let relevantRuls = this.getRulesByFilePath(filepath);
        if (!relevantRuls.length&&calledByPath){
            relevantRuls = this.getRulesByFilePath(calledByPath)
        }

        const pathReadResult = this.resolvePath(relativeMatch,filepath);

        if (pathReadResult.isDirectory){
            const children = this.fileLoader.readDir(filepath);
            children.forEach((fp)=>{
                relevantRuls.some((rule)=>{
                    if (rule.isDirectory.find(pattern=> pattern.pattern.test(fp))){
                        const name = this.fileLoader.getAbsPath(fp);
                        fileTraceResult.addRequire(new Dependency({name , path: fp , type:'file'}));
                        this.traceChildOf(fp);
                        return true;
                    }
                })
                
            });
        }
        else{
            const filepath = pathReadResult.filepath;
            if (!filepath)return
            const content = this.fileLoader.readFile(pathReadResult);
            const matches = this.traceContent(content,filepath,relevantRuls);
            matches.forEach((match)=>{
                relevantRuls.some((rule)=>{
                    const isModule = rule.modules.find(pattern=> pattern.pattern.test(match));
                    if (isModule){
                        fileTraceResult.addRequire(new Dependency({name:match , type:'module'}));
                        return true
                    }
                    const childPath = resolve(dirname(filepath),match);
                    const name = this.fileLoader.getAbsPath(childPath);
                    fileTraceResult.addRequire(new Dependency({name ,path:childPath, type:'file'}));
                    this.traceChildOf(childPath , relativeMatch , filepath); 
                    return true;
                });       
            })
        }
    }
    getRulesByFilePath(filepath){
        const fromExt = extname(filepath);
        const relevantRuls = lookupRules.filter((rule)=>{
            return rule.match.includes(fromExt)
        });
        return relevantRuls;
    }
    traceContent(content , contentPath, relevantRuls){
        content = (content||'').toString();
        const results = [];
        relevantRuls.forEach((rule)=>{
            rule.content.forEach((pattern)=>{
                if (pattern.extractor){
                    results.push(
                        ...pattern.extractor(content)
                    )
                    return
                }
                content.replace(pattern.pattern , (
                    fullMatch ,
                    matchPath
                )=>{
                    results.push(matchPath)
                });
            })
        })
        return results;
    }
}

module.exports = {
    FileTrace,
    Dependency,
    FileTraceResult
}

