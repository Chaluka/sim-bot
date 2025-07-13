import { CommandParser, CommandType, PlaceCommand, CommandParserError } from '../../commands';
import { Direction } from '../../core/surface-items';

describe('CommandParser', () => {
    describe('parse', () => {
        describe('postive tests', () => {
            it('should parase PLACE command correctly', () => {
                // Arrange
                const input = 'PLACE 1,2,NORTH';
                // Act
                const actualCommand = CommandParser.parse(input) as PlaceCommand;
                // Assert
                expect(actualCommand.type).toBe(CommandType.PLACE);
                expect(actualCommand.location.x).toBe(1);
                expect(actualCommand.location.y).toBe(2);
                expect(actualCommand.direction).toBe(Direction.NORTH);
            });

            it('should parase MOVE command correctly', () => {
                // Arrange
                const input = 'MOVE';
                // Act
                const actualCommand = CommandParser.parse(input);
                // Assert
                expect(actualCommand.type).toBe(CommandType.MOVE);
            });

            it('should parase LEFT command correctly', () => {
                // Arrange
                const input = 'LEFT';
                // Act
                const actualCommand = CommandParser.parse(input);
                // Assert
                expect(actualCommand.type).toBe(CommandType.LEFT);
            });

            it('should parase RIGHT command correctly', () => {
                // Arrange
                const input = 'RIGHT';
                // Act
                const actualCommand = CommandParser.parse(input);
                // Assert
                expect(actualCommand.type).toBe(CommandType.RIGHT);
            });

            it('should parase REPORT command correctly', () => {
                // Arrange
                const input = 'REPORT';
                // Act
                const actualCommand = CommandParser.parse(input);
                // Assert
                expect(actualCommand.type).toBe(CommandType.REPORT);
            });

            it('should parase command with spaces correctly', () => {
                // Arrange
                const input = ' RIGHT   ';
                // Act
                const actualCommand = CommandParser.parse(input);
                // Assert
                expect(actualCommand.type).toBe(CommandType.RIGHT);
            });
        });

        describe('negative', () => {
            const error = new CommandParserError(CommandParser.FORMAT_ERROR_MESSAGE);
            it('should throw error when PLACE command missing direction', () => {
                // Arrange
                const input = 'PLACE 1,2';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when PLACE command missing coordinates', () => {
                // Arrange
                const input = 'PLACE NORTH';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when PLACE command incorrect coordinates values', () => {
                // Arrange
                const input = 'PLACE 1,A,NORTH';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when PLACE command missing params', () => {
                // Arrange
                const input = 'PLACE';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when command contains unexpected params', () => {
                // Arrange
                const input = 'MOVE 1,1,NORTH';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when command is not uppercase', () => {
                // Arrange
                const input = 'move';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });

            it('should throw error when direction param is not uppercase', () => {
                // Arrange
                const input = 'PLACE 1,5,north';
                // Act & Assert
                expect(() => {
                    CommandParser.parse(input);
                }).toThrow(error);
            });
        });
    });
});
