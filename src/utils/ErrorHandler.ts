import { ErrorResult } from './ErrorResult';

export class ErrorHandler {
    public static readonly DEFAULT_ERROR_CODE = '404';
    public static handleExecutionError(error: Error): ErrorResult {
        const code = this.getErrorCode(error);
        return {
            name: error.name,
            code,
            message: error.message,
            error: JSON.stringify(error.stack),
        };
    }

    private static getErrorCode(error: Error) {
        return ErrorHandler.DEFAULT_ERROR_CODE;
    }
}
