import { CommandExecutionResult } from '../commands';

export class ErrorHandler {
    public static handleExecutionError(error: Error): CommandExecutionResult {
        return {
            success: false,
            error: error.message,
            data: { name: error.name, code: '404', stackTrace: JSON.stringify(error.message) },
        };
    }
}
