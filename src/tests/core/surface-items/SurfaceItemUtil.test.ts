import { SurfaceItemUtil, Direction, Rotation } from '../../../core/surface-items';

describe('SurfaceItemUtil', () => {
    describe('rotate', () => {
        it('should rotate NORTH to EAST when turning RIGHT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.NORTH, Rotation.RIGHT);
            expect(newDirection).toBe(Direction.EAST);
        });

        it('should rotate EAST to SOUTH when turning RIGHT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.EAST, Rotation.RIGHT);
            expect(newDirection).toBe(Direction.SOUTH);
        });

        it('should rotate SOUTH to WEST when turning RIGHT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.SOUTH, Rotation.RIGHT);
            expect(newDirection).toBe(Direction.WEST);
        });

        it('should rotate WEST to NORTH when turning RIGHT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.WEST, Rotation.RIGHT);
            expect(newDirection).toBe(Direction.NORTH);
        });

        it('should rotate NORTH to WEST when turning LEFT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.NORTH, Rotation.LEFT);
            expect(newDirection).toBe(Direction.WEST);
        });

        it('should rotate WEST to SOUTH when turning LEFT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.WEST, Rotation.LEFT);
            expect(newDirection).toBe(Direction.SOUTH);
        });

        it('should rotate SOUTH to EAST when turning LEFT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.SOUTH, Rotation.LEFT);
            expect(newDirection).toBe(Direction.EAST);
        });

        it('should rotate EAST to NORTH when turning LEFT', () => {
            const newDirection = SurfaceItemUtil.rotate(Direction.EAST, Rotation.LEFT);
            expect(newDirection).toBe(Direction.NORTH);
        });
    });
});
