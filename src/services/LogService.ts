enum Prefixes {
    log = '[LOG  ] ',
    info = '[INFO ] ',
    debug = '[DEBUG] ',
    error = '[ERROR] ',
}

/**
 * TODO: the logging service can be further developed,
 * so it take a min and max log level,
 * so it can be "quitter" when needed.
 */
export const LogService = {
    log,
    debug,
    info,
    error,
}

function log(...data: any[]) {
    console.log(Prefixes.log, ...data);
}

function debug(...data: any[]) {
    console.debug(Prefixes.debug, ...data);
}

function info(...data: any[]) {
    console.info(Prefixes.info, ...data);
}

function error(...data: any[]) {
    console.error(Prefixes.error, ...data);
}
