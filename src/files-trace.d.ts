declare module FilesTrace{
    export function trace(options:TraceOptions):{
        [key:string]:FileTraceResult
    }
    interface TraceOptions{
        base?:string;
        filePath:string;
        fileLoader:FileLoader
    }
    interface PathReadResult{
        dirpath:string;
        isDirectory:boolean;
        filepath:string;
        ext:string;
        isFile:boolean;
        fileSize:number;
    }
    interface FileLoader{
        on(name:string, cb:(d:any)=>void):void;
        emit(name:string,d:any):void;
        resolvePath(filepath: string):PathReadResult;
        readFile({filepath , fileSize}):Buffer;
        readDir(dirpath: string):string[];
        getAbsPath(filepath:string):string;
    }
    interface FileTraceResult{
        name: string;
        requires: Dependency[];
    }

    class Dependency{
        name: string;
        path: string;
        type: 'file' | 'module';
    }
}
export = FilesTrace;