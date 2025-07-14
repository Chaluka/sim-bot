import { PlacementExecutionError } from '../../commands/CommandExecutionErrors';
import { ErrorHandler } from '../../utils/ErrorHandler';

describe('ErrorHandler', () => {
    describe('handleError', () => {
        it('should return formatted error', () => {
            // Arrange
            const errorMessage = 'test error message';
            const error = new PlacementExecutionError(errorMessage);
            // Act
            const result = ErrorHandler.handleExecutionError(error);
            // Assert
            expect(result.name).toBe(error.name);
            expect(result.message).toBe(errorMessage);
            expect(result.code).toBe(ErrorHandler.DEFAULT_ERROR_CODE);
        });
    });
});
