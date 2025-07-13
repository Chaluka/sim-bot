import { Direction } from '../../../core/surface-items/Direction';
import { Robot } from '../../../core/surface-items/Robot';
import { Rotation } from '../../../core/surface-items/Rotation';

describe('Robot', () => {
    describe('setters', () => {
        it('should place the robot at the specified location', () => {
            const robot = new Robot('1', { x: 0, y: 0 }, Direction.NORTH);
            robot.location = { x: 5, y: 5 };
            expect(robot.location).toEqual({ x: 5, y: 5 });
        });

        it("should change the robot's direction", () => {
            const robot = new Robot('1', { x: 0, y: 0 }, Direction.NORTH);
            robot.direction = Direction.EAST;
            expect(robot.direction).toBe(Direction.EAST);
        });
    });

    describe('move', () => {
        it('should handle movement in all directions', () => {
            const robotNorth = new Robot('1', { x: 0, y: 0 }, Direction.NORTH);
            robotNorth.move();
            expect(robotNorth.location).toEqual({ x: 0, y: 1 });

            const robotSouth = new Robot('2', { x: 0, y: 0 }, Direction.SOUTH);
            robotSouth.move();
            expect(robotSouth.location).toEqual({ x: 0, y: -1 });

            const robotEast = new Robot('3', { x: 0, y: 0 }, Direction.EAST);
            robotEast.move();
            expect(robotEast.location).toEqual({ x: 1, y: 0 });

            const robotWest = new Robot('4', { x: 0, y: 0 }, Direction.WEST);
            robotWest.move();
            expect(robotWest.location).toEqual({ x: -1, y: 0 });
        });
    });

    describe('rotate', () => {
        it('should rotate the robot to the left', () => {
            const robot = new Robot('1', { x: 0, y: 0 }, Direction.NORTH);
            robot.rotate(Rotation.LEFT);
            expect(robot.direction).toBe(Direction.WEST);
        });

        it('should rotate the robot to the right', () => {
            const robot = new Robot('1', { x: 0, y: 0 }, Direction.NORTH);
            robot.rotate(Rotation.RIGHT);
            expect(robot.direction).toBe(Direction.EAST);
        });
    });

    describe('report', () => {
        it('should return the correct item state', () => {
            const robot = new Robot('6', { x: 5, y: 5 }, Direction.EAST);
            const state = robot.report();
            expect(state).toEqual({
                id: '6',
                location: { x: 5, y: 5 },
                direction: Direction.EAST,
            });
        });
    });
});
