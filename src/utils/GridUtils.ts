export class GridUtils {
    /**
     * Initializes a 2D grid with the specified width and height, filling it with a default value.
     * @param width - The width of the grid.
     * @param height - The height of the grid.
     * @param defaultValue - The value to fill the grid with.
     * @return A 2D array representing the initialized grid.
     */
    public static initializeGrid<T>(width: number, height: number, defaultValue: T): T[][] {
        const grid: T[][] = [];
        for (let i = 0; i < height; i++) {
            grid[i] = new Array(width).fill(defaultValue);
        }
        return grid;
    }
}
