import { Rotation, SurfaceItem, SurfaceItemFactory, SurfaceItemType, SurfaceItemUtil } from '../core/surface-items';
import { Surface } from '../core/surfaces';
import { ErrorHandler, Logger } from '../utils';
import { BlockCommand } from './BlockCommand';
import { Command } from './Command';
import {
    CommandExecutionErrors,
    MovementExecutionError,
    PlacementExecutionError,
    ReportingExecutionError,
    RotationExecutionError,
} from './CommandExecutionErrors';
import { CommandExecutionResult } from './CommandExecutionResult';
import { CommandType } from './CommandType';
import { FindCommand } from './FindCommand';
import { PlaceCommand } from './PlaceCommand';

export class CommandExecutor {
    constructor(private _surface: Surface) {}
    /**
     * Executes a user command on the surface.
     *
     * @param input - A raw command string provided by the user (e.g., "PLACE 0,0,NORTH", "MOVE").
     * @returns A {@link CommandExecutionResult} summarizing the outcome of the command execution,
     * including success status and error (if any).
     *
     * @throws This method does not throw; all errors are captured and returned as part of the result.
     */
    public execute(item: SurfaceItem | null, command: Command): CommandExecutionResult {
        try {
            if (!item) {
                throw new Error('Item does not exists');
            }
            return this._execute(item, command);
        } catch (error) {
            Logger.error((error as Error).message);
            return this.createCommandExecutionErrorResult(error as Error, command?.type);
        }
    }

    private _execute(item: SurfaceItem, command: Command): CommandExecutionResult {
        switch (command.type) {
            case CommandType.PLACE:
                return this.handlePlaceCommand(item, command as PlaceCommand);
            case CommandType.BLOCK:
                return this.handleBlockCommand(item, command as BlockCommand);
            case CommandType.MOVE:
                return this.handleMoveCommand(item);
            case CommandType.LEFT:
            case CommandType.RIGHT:
                return this.handleTurnCommand(item, command.type);
            case CommandType.REPORT:
                return this.handleReportCommand(item);
            case CommandType.FIND:
                return this.handleFindCommand(item, command as FindCommand);
            default:
                throw new Error(`Unknown command type: ${command.type}`);
        }
    }

    protected handlePlaceCommand(item: SurfaceItem, command: PlaceCommand): CommandExecutionResult {
        try {
            if (SurfaceItemUtil.isMovableOrRotatable(item)) {
                item.direction = command.direction;
            }
            this._surface.placeItem(item, command.location);
            return this.createCommandExecutionResult(CommandType.PLACE, item);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new PlacementExecutionError(errorMessage);
        }
    }

    protected handleBlockCommand(item: SurfaceItem, command: BlockCommand): CommandExecutionResult {
        try {
            this._surface.placeItem(item, command.location);
            return this.createCommandExecutionResult(CommandType.PLACE, item);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new PlacementExecutionError(errorMessage);
        }
    }

    protected handleMoveCommand(surfaceItem: SurfaceItem): CommandExecutionResult {
        try {
            if (SurfaceItemUtil.isMovable(surfaceItem)) {
                this._surface.placeItem(surfaceItem, surfaceItem.nextMove()!);
                return this.createCommandExecutionResult(CommandType.MOVE, surfaceItem);
            } else {
                throw new Error(CommandExecutionErrors.ITEM_CANNOT_BE_MOVED);
            }
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new MovementExecutionError(errorMessage);
        }
    }

    protected handleTurnCommand(surfaceItem: SurfaceItem, type: CommandType): CommandExecutionResult {
        try {
            if (!SurfaceItemUtil.isRotatable(surfaceItem)) {
                throw new Error(CommandExecutionErrors.ITEM_CANNOT_BE_ROTATED);
            }
            surfaceItem.rotate(type === CommandType.LEFT ? Rotation.LEFT : Rotation.RIGHT);
            return this.createCommandExecutionResult(type, surfaceItem);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new RotationExecutionError(errorMessage);
        }
    }

    protected handleReportCommand(surfaceItem: SurfaceItem): CommandExecutionResult {
        try {
            return this.createCommandExecutionResult(CommandType.REPORT, surfaceItem);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new ReportingExecutionError(errorMessage);
        }
    }

    protected handleFindCommand(surfaceItem: SurfaceItem, command: FindCommand): CommandExecutionResult {
        try {
            if (!SurfaceItemUtil.isAutonomous(surfaceItem)) {
                throw new Error('This is not autonoumous');
            }
            const result = surfaceItem.findPath(command.location);
            return {
                ...this.createCommandExecutionResult(CommandType.FIND, surfaceItem),
                path: result ? result.map((node) => `{${node.x}, ${node.y}}}`).join('->') : 'No Path Found',
            };
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new ReportingExecutionError(errorMessage);
        }
    }

    private createCommandExecutionResult(commandType: CommandType, item: SurfaceItem): CommandExecutionResult {
        return {
            success: true,
            command: commandType,
            itemStatus: item.report(),
        };
    }

    private createCommandExecutionErrorResult(error: Error, commandType?: CommandType): CommandExecutionResult {
        const errorResult = ErrorHandler.handleExecutionError(error);
        return {
            success: false,
            command: commandType,
            error: errorResult,
        };
    }
}
