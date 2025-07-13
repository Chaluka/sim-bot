import { Rotation, SurfaceItemFactory, SurfaceItemType, SurfaceItemUtil } from '../core/surface-items';
import { Surface } from '../core/surfaces';
import { Command } from './Command';
import {
    CommandExecutionErrors,
    MovementExecutionError,
    PlacementExecutionError,
    ReportingExecutionError,
    RotationExecutionError,
} from './CommandExecutionErrors';
import { CommandType } from './CommandType';
import { PlaceCommand } from './PlaceCommand';

export class CommandExecutor {
    private static readonly ENTITY_ID = 'robot_1'; // Example entity ID, can be customized
    constructor(
        private _surface: Surface,
        private _surfaceItemFactory: SurfaceItemFactory
    ) {}

    public execute(command: Command): void {
        switch (command.type) {
            case CommandType.PLACE:
                this.handlePlaceCommand(command as PlaceCommand);
                break;
            case CommandType.MOVE:
                this.handleMoveCommand();
                break;
            case CommandType.LEFT:
            case CommandType.RIGHT:
                this.handleTurnCommand(command.type);
                break;
            case CommandType.REPORT:
                this.handleReportCommand();
                break;
            default:
                throw new Error(`Unknown command type: ${command.type}`);
        }
    }

    protected handlePlaceCommand(command: PlaceCommand) {
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
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new PlacementExecutionError(errorMessage);
        }
    }

    protected handleMoveCommand() {
        try {
            const surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
            if (SurfaceItemUtil.isMovable(surfaceItem)) {
                if (this._surface.isValidPlacement(surfaceItem.nextMove())) {
                    surfaceItem.move();
                    this._surface.placeItem(surfaceItem);
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

    protected handleTurnCommand(type: CommandType) {
        try {
            const surfaceItem = this._surface.getItem(CommandExecutor.ENTITY_ID);
            if (!SurfaceItemUtil.isRotatable(surfaceItem)) {
                throw new Error(CommandExecutionErrors.ITEM_CANNOT_BE_ROTATED);
            }
            surfaceItem.rotate(type === CommandType.LEFT ? Rotation.LEFT : Rotation.RIGHT);
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new RotationExecutionError(errorMessage);
        }
    }

    protected handleReportCommand() {
        try {
            this._surface.getItem(CommandExecutor.ENTITY_ID)?.report();
        } catch (error) {
            const errorMessage = `${CommandExecutionErrors.COMMAND_EXECUTION_FAILED} ${error}`;
            throw new ReportingExecutionError(errorMessage);
        }
    }
}
