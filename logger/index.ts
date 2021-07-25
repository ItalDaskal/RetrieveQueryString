const getTimestamp = (): string => {
    return new Date().toISOString();
}

const info = (namespace: string, message: string, object?: any) => {
    if(object){
        console.info(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object);
    }else{
        console.info(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
    }
}

const warn = (namespace: string, message: string, object?: any) => {
    if(object){
        console.warn(`[${getTimestamp()}] [warn] [${namespace}] ${message}`, object);
    }else{
        console.warn(`[${getTimestamp()}] [warn] [${namespace}] ${message}`);
    }
}

const error = (namespace: string, message: string, object?: any) => {
    if(object){
        console.error(`[${getTimestamp()}] [error] [${namespace}] ${message}`, object);
    }else{
        console.error(`[${getTimestamp()}] [error] [${namespace}] ${message}`);
    }
}

const debug = (namespace: string, message: string, object?: any) => {
    if(object){
        console.debug(`[${getTimestamp()}] [debug] [${namespace}] ${message}`, object);
    }else{
        console.debug(`[${getTimestamp()}] [debug] [${namespace}] ${message}`);
    }
}

export default {
    info,
    warn,
    error,
    debug
};