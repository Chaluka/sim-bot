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
            expect(result.success).toBe(false);
            expect(result.error).toBe(errorMessage);
            expect(result.data.name).toBe(error.name);
        });
    });
});
