import { GridUtils } from '../../utils';

describe('GridUtils', () => {
    describe('initializeGrid', () => {
        it('should create a grid with the specified dimensions', () => {
            const width = 5;
            const height = 10;
            const defaultValue = '0';
            const grid = GridUtils.initializeGrid(width, height, defaultValue);
            expect(grid).toHaveLength(height);
            expect(grid[0]).toHaveLength(width);
            expect(grid[0][0]).toBe(defaultValue);
        });
    });
});
