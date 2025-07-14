import { Rotation, SurfaceItem, SurfaceItemFactory, SurfaceItemType, SurfaceItemUtil } from '../core/surface-items';
import { Surface } from '../core/surfaces';
import { ErrorHandler, Logger } from '../utils';
import { Command } from './Command';
import {
    CommandExecutionErrors,
    MovementExecutionError,
    PlacementExecutionError,
    ReportingExecutionError,
    RotationExecutionError,
} from './CommandExecutionErrors';
import { CommandExecutionResult } from './CommandExecutionResult';
import { CommandParser } from './CommandParser';
import { CommandType } from './CommandType';
import { PlaceCommand } from './PlaceCommand';

export class CommandExecutor {
    private static readonly ENTITY_ID = 'robot_1'; // Example entity ID, can be customized
    constructor(
        private _surface: Surface,
        private _surfaceItemFactory: SurfaceItemFactory,
        private _commandParser: CommandParser
    ) {}

    /**
     * Executes a user command on the surface.
     *
     * @param input - A raw command string provided by the user (e.g., "PLACE 0,0,NORTH", "MOVE").
     * @returns A {@link CommandExecutionResult} summarizing the outcome of the command execution,
     * including success status and error (if any).
     *
     * @throws This method does not throw; all errors are captured and returned as part of the result.
     */
    public execute(input: string): CommandExecutionResult {
        let command;
        try {
            command = this._commandParser.parse(input);
            return this._execute(command);
        } catch (error) {
            Logger.error((error as Error).message);
            return this.createCommandExecutionErrorResult(error as Error, command?.type);
        }
    }

    private _execute(command: Command): CommandExecutionResult {
        switch (command.type) {
            case CommandType.PLACE:
                return this.handlePlaceCommand(command as PlaceCommand);
            case CommandType.MOVE:
                return this.handleMoveCommand();
            case CommandType.LEFT:
            case CommandType.RIGHT:
                return this.handleTurnCommand(command.type);
            case CommandType.REPORT:
                return this.handleReportCommand();
            default:
                throw new Error(`Unknown command type: ${command.type}`);
        }
    }

    protected handlePlaceCommand(command: PlaceCommand): CommandExecutionResult {
        try {
            let surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
            if (!surfaceItem) {
                surfaceItem = this._surfaceItemFactory.create(
                    SurfaceItemType.ROBOT,
                    CommandExecutor.ENTITY_ID,
                    command.direction,
                    this._surface
                );
            } else if (SurfaceItemUtil.isMovableOrRotatable(surfaceItem)) {
                surfaceItem.direction = command.direction;
            }
            this._surface.placeItem(surfaceItem, command.location);
            return this.createCommandExecutionResult(CommandType.PLACE, surfaceItem);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new PlacementExecutionError(errorMessage);
        }
    }

    protected handleMoveCommand(): CommandExecutionResult {
        try {
            const surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
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

    protected handleTurnCommand(type: CommandType): CommandExecutionResult {
        try {
            const surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
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

    protected handleReportCommand(): CommandExecutionResult {
        try {
            const surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
            if (!surfaceItem) {
                throw new Error(CommandExecutionErrors.ITEM_NOT_EXIST);
            }
            return this.createCommandExecutionResult(CommandType.REPORT, surfaceItem);
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
