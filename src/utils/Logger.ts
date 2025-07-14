import { LogLevel } from './LogLevel';

export class Logger {
    private static _logger: Logger | null;
    private static _logs: Map<string, string[]>;
    private static _verbose: boolean;

    private constructor() {}

    public static getLogger(verbose: boolean = false) {
        if (!Logger._logger) {
            Logger._logger = new Logger();
            Logger._logs = new Map<string, string[]>();
        }
        Logger._verbose = verbose;
        return Logger._logger;
    }

    public static log(type: LogLevel, message: string) {
        if (!Logger._logger) {
            return;
        }
        const output = `${type} : ${message}`;
        Logger.addLogEntry(type, output);
        if (this._verbose) {
            return;
        }
        switch (type) {
            case LogLevel.INFO:
                console.log(output);
                break;
            case LogLevel.WARN:
                console.warn(output);
                break;
            case LogLevel.ERROR:
                console.error(output);
                break;
            case LogLevel.DEBUG:
                console.debug(output);
                break;
        }
    }

    public static info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    public static warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    public static error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    public static debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    private static addLogEntry(type: LogLevel, message: string) {
        if (!Logger._logs.has(type)) {
            Logger._logs.set(type, []);
        }

        Logger._logs.get(type)!.push(message);
    }
}
