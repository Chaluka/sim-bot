import {
    Command,
    CommandExecutor,
    CommandParser,
    CommandType,
    PlaceCommand,
    CommandExecutionErrors,
    CommandExecutionResult,
} from '../../commands';
import {
    Direction,
    Movable,
    Rotatable,
    Rotation,
    SurfaceItem,
    SurfaceItemFactory,
    Location,
    ItemStatus,
    Robot,
} from '../../core/surface-items';
import { Surface } from '../../core/surfaces';
import { SurfaceItemTestHelper } from '../helpers/SurfaceItemTestHelper';
import { SurfaceTestHelper } from '../helpers/SurfaceTestHelper';

describe('CommandExecutor', () => {
    let commandExecutor: CommandExecutor;
    let mockSurface: jest.Mocked<Surface>;
    let mockSurfaceItem: jest.Mocked<SurfaceItem & Movable & Rotatable>;

    describe('execute', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            mockSurface = SurfaceTestHelper.createMockSurface();
            mockSurfaceItem = SurfaceItemTestHelper.createMockMovableRotatableSurfaceItem(
                '1',
                Direction.NORTH,
                mockSurface
            );
            mockSurface.getItemLocation.mockReturnValue({ x: 0, y: 0 });
            mockSurface.getItem.mockReturnValue(mockSurfaceItem);
            commandExecutor = new CommandExecutor(mockSurface);
        });

        describe('execute PLACE commands', () => {
            let command: PlaceCommand;
            beforeEach(() => {
                command = {
                    type: CommandType.PLACE,
                    location: { x: 0, y: 0 },
                    direction: Direction.NORTH,
                };
            });

            it('should place new item correctly', () => {
                // Assign
                mockSurface.getItem.mockReturnValue(null);

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command);

                // Assert
                assertCommandExecutionSuccess(CommandType.PLACE, result);
                expect(mockSurface.placeItem).toHaveBeenCalledWith(mockSurfaceItem, command.location);
            });

            it('should place existing item correctly', () => {
                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command);

                // Assert
                assertCommandExecutionSuccess(CommandType.PLACE, result);
                expect(mockSurface.placeItem).toHaveBeenCalledWith(mockSurfaceItem, command.location);
            });

            it('should throw error when place command cannot be executed', () => {
                // Assign
                const errorMessage = 'placement error';
                mockSurface.placeItem.mockImplementation(() => {
                    throw new Error(errorMessage);
                });

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command);

                // Assert
                assertCommandExecutionFailure(CommandType.PLACE, result, errorMessage);
            });
        });

        describe('execute LEFT command', () => {
            let command: Command;
            beforeEach(() => {
                command = {
                    type: CommandType.LEFT,
                };
            });

            it('should turn the item left', () => {
                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command);

                // Assert
                assertCommandExecutionSuccess(CommandType.LEFT, result);
                expect(mockSurfaceItem.rotate).toHaveBeenCalledWith(Rotation.LEFT);
            });

            it('should throw error when left command cannot be executed', () => {
                // Assign
                const errorMessage = 'turn left error';
                mockSurfaceItem.rotate.mockImplementation(() => {
                    throw new Error(errorMessage);
                });

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command);

                // Assert
                assertCommandExecutionFailure(CommandType.LEFT, result, errorMessage);
            });
        });

        describe('execute RIGHT command', () => {
            let command: Command;
            beforeEach(() => {
                command = {
                    type: CommandType.RIGHT,
                };
            });

            it('should turn the item right', () => {
                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'RIGHT');

                // Assert
                assertCommandExecutionSuccess(CommandType.RIGHT, result);
                expect(mockSurfaceItem.rotate).toHaveBeenCalledWith(Rotation.RIGHT);
            });

            it('should throw error when left command cannot be executed', () => {
                // Assign
                const errorMessage = 'turn right error';
                mockSurfaceItem.rotate.mockImplementation(() => {
                    throw new Error(errorMessage);
                });

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'INVALID-COMMAND');

                // Assert
                assertCommandExecutionFailure(CommandType.RIGHT, result, errorMessage);
            });
        });

        describe('execute MOVE', () => {
            let command: Command;
            let nextLocation: Location;

            beforeEach(() => {
                command = {
                    type: CommandType.MOVE,
                };

                nextLocation = { x: 5, y: 10 };
                mockSurfaceItem.nextMove.mockReturnValue(nextLocation);
            });

            it('should move item to right direction', () => {
                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'MOVE');

                // Assert
                assertCommandExecutionSuccess(CommandType.MOVE, result);
                expect(mockSurface.placeItem).toHaveBeenCalledWith(mockSurfaceItem, nextLocation);
            });

            it('should throw error when move command cannot be executed', () => {
                // Assign
                const errorMessage = 'move error';
                mockSurface.placeItem.mockImplementation(() => {
                    throw new Error(errorMessage);
                });

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'INVALID-COMMAND');

                // Assert
                assertCommandExecutionFailure(CommandType.MOVE, result, errorMessage);
            });
        });

        describe('REPORT', () => {
            let command: Command;
            let mockItemStatus: ItemStatus;

            beforeEach(() => {
                command = {
                    type: CommandType.REPORT,
                };

                mockItemStatus = {
                    id: 'tset-id',
                    location: { x: 2, y: 3 },
                    direction: Direction.NORTH,
                };
                mockSurfaceItem.report.mockReturnValue(mockItemStatus);
            });

            it('should move item to right direction', () => {
                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'REPORT');

                // Assert
                assertCommandExecutionSuccess(CommandType.REPORT, result);
                expect(result.itemStatus?.id).toBe(mockItemStatus.id);
                expect(result.itemStatus?.location?.x).toBe(mockItemStatus.location?.x);
                expect(result.itemStatus?.location?.y).toBe(mockItemStatus.location?.y);
                expect(result.itemStatus?.direction).toBe(mockItemStatus.direction);
            });

            it('should throw error when move command cannot be executed', () => {
                // Assign
                const errorMessage = 'report error';
                mockSurfaceItem.report.mockImplementation(() => {
                    throw new Error(errorMessage);
                });

                // Act
                const result = commandExecutor.execute(mockSurfaceItem, command); //'INVALID-COMMAND');

                // Assert
                assertCommandExecutionFailure(CommandType.REPORT, result, errorMessage);
            });
        });
    });
});

function assertCommandExecutionSuccess(commandType: CommandType, result: CommandExecutionResult) {
    expect(result.success).toBeTruthy();
    expect(result.command).toBe(commandType);
}

function assertCommandExecutionFailure(commandType: CommandType, result: CommandExecutionResult, errorMessage: string) {
    expect(result.success).toBeFalsy();
    expect(result.command).toBe(commandType);
    expect(result.itemStatus).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain(errorMessage);
}
