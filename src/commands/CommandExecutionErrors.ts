export class CommandExecutionErrors {
    static readonly COMMAND_NOT_SUPPORTED = 'The command is not supported on this surface.';
    static readonly COMMAND_EXECUTION_FAILED = 'Failed to execute the command on the surface. Details: ';
    static readonly ITEM_CANNOT_BE_MOVED = 'The item cannot be moved.';
    static readonly ITEM_CANNOT_BE_PLACED = 'The item cannot be placed at the specified location.';
    static readonly ITEM_CANNOT_BE_ROTATED = 'The item cannot be rotated.';
    static readonly MOVEMENT_OUT_OF_BOUNDS = 'The item cannot be moved off the surface.';
}

export class PlacementExecutionError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, PlacementExecutionError.prototype);
        this.name = 'PlacementExecutionError';
    }
}

export class MovementExecutionError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, MovementExecutionError.prototype);
        this.name = 'MovementExecutionError';
    }
}

export class RotationExecutionError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, RotationExecutionError.prototype);
        this.name = 'RotationExecutionError';
    }
}

export class ReportingExecutionError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ReportingExecutionError.prototype);
        this.name = 'ReportingExecutionError';
    }
}
