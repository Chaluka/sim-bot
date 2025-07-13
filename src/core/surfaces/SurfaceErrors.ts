export class SurfaceErrors {
    static readonly INVALID_PLACEMENT_OUT_OF_BOUNDS = 'The position is out of bounds of the surface.';
    static readonly INVALID_PLACEMENT_ALREADY_OCCUPIED = 'The position is already occupied by another item.';
    static readonly INVALID_DIRECTION = 'The direction provided is invalid.';
    static readonly COMMAND_NOT_SUPPORTED = 'The command is not supported on this surface.';
    static readonly COMMAND_EXECUTION_FAILED = 'Failed to execute the command on the surface.';
    static readonly ITEM_NOT_FOUND = 'The specified item was not found on the surface.';
    static readonly ITEM_CANNOT_BE_MOVED = 'The item cannot be moved.';
}

export class SurfaceError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, SurfaceError.prototype);
        this.name = 'SurfaceError';
    }
}
