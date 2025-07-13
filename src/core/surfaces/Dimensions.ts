export class Dimensions {
    constructor(
        private readonly _width: number,
        private readonly _height: number
    ) {}

    /**
     * Gets the width of the dimensions.
     * @returns The width of the dimensions.
     */
    get width(): number {
        return this._width;
    }
    /**
     * Gets the height of the dimensions.
     * @returns The height of the dimensions.
     */
    get height(): number {
        return this._height;
    }

    /**
     * Checks if the given coordinates are within the boundaries defined by these dimensions.
     * @param x The x-coordinate to check.
     * @param y The y-coordinate to check.
     * @returns True if the coordinates are within the boundaries, false otherwise.
     */
    isWithinBoundary(x: number, y: number): boolean {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }
}
