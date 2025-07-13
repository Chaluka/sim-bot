import {
    ItemStatus,
    Rotation,
    SurfaceItem,
    SurfaceItemFactory,
    SurfaceItemType,
    SurfaceItemUtil,
} from '../core/surface-items';
import { Surface } from '../core/surfaces';
import { ErrorHandler } from '../utils';
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
        private _surfaceItemFactory: SurfaceItemFactory
    ) {}

    public execute(input: string): CommandExecutionResult {
        let command;
        try {
            command = CommandParser.parse(input);
            return this._execute(command);
        } catch (error) {
            return ErrorHandler.handleExecutionError(error as Error);
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
                    command.location,
                    command.direction
                );
            } else if (this._surface.isValidPlacement(command.location)) {
                surfaceItem.location = command.location;
                if (SurfaceItemUtil.isMovableOrRotatable(surfaceItem)) {
                    surfaceItem.direction = command.direction;
                }
            } else {
                throw new Error(CommandExecutionErrors.ITEM_CANNOT_BE_PLACED);
            }
            this._surface.placeItem(surfaceItem);
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
                if (this._surface.isValidPlacement(surfaceItem.nextMove())) {
                    surfaceItem.move();
                    this._surface.placeItem(surfaceItem);
                    return this.createCommandExecutionResult(CommandType.MOVE, surfaceItem);
                } else {
                    throw new Error(CommandExecutionErrors.MOVEMENT_OUT_OF_BOUNDS);
                }
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
}
