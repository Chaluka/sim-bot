import { Direction, Location, Robot, Rotation } from '../../../core/surface-items';
import { SurfaceTestHelper } from '../../helpers/SurfaceTestHelper';
import { Surface } from '../../../core/surfaces';
import { TestHelperUtil } from '../../helpers/TestHelperUtil';

function assertLocationIsEqual(expected: Location, actual: Location | null) {
    expect(actual?.x).toBeDefined();
    expect(actual?.y).toBeDefined();
    expect(TestHelperUtil.isSameLocation(expected, actual!)).toBeTruthy();
}

describe('Robot', () => {
    let surface: jest.Mocked<Surface>;
    let surfaceItem: Robot;

    beforeEach(() => {
        surface = SurfaceTestHelper.createMockSurface() as jest.Mocked<Surface>;
        surface.getItemLocation.mockReturnValue({ x: 0, y: 0 });
        surfaceItem = new Robot('1', Direction.NORTH, surface);
    });

    describe('setters and getters', () => {
        it('should place the robot at the specified location', () => {
            // Act and Assert
            const location = { x: 0, y: 0 };
            assertLocationIsEqual(location, surfaceItem.location);
        });

        it("should change the robot's direction", () => {
            surfaceItem.direction = Direction.EAST;
            expect(surfaceItem.direction).toBe(Direction.EAST);
        });
    });

    describe('nextMove', () => {
        it('should handle movement in all directions', () => {
            // Act & Assert
            let newLocation = surfaceItem.nextMove();
            assertLocationIsEqual({ x: 0, y: 1 }, newLocation);

            surfaceItem.direction = Direction.EAST;
            newLocation = surfaceItem.nextMove();
            assertLocationIsEqual({ x: 1, y: 0 }, newLocation);

            surfaceItem.direction = Direction.SOUTH;
            newLocation = surfaceItem.nextMove();
            assertLocationIsEqual({ x: 0, y: -1 }, newLocation);

            surfaceItem.direction = Direction.WEST;
            newLocation = surfaceItem.nextMove();
            assertLocationIsEqual({ x: -1, y: 0 }, newLocation);
        });
    });

    describe('rotate', () => {
        it('should rotate the robot to the left', () => {
            // Act & Assert
            surfaceItem.rotate(Rotation.LEFT);
            expect(surfaceItem.direction).toBe(Direction.WEST);
        });

        it('should rotate the robot to the right', () => {
            // Act & Assert
            surfaceItem.rotate(Rotation.RIGHT);
            expect(surfaceItem.direction).toBe(Direction.EAST);
        });
    });

    describe('report', () => {
        it('should return the correct item state', () => {
            // Assign
            let loation = { x: 0, y: 0 };
            surface.getItemLocation.mockReturnValue(loation);
            // Act
            const state = surfaceItem.report();
            // Assert
            expect(state.id).toBe('1');
            expect(state.direction).toBe(Direction.NORTH);
            expect(state.location).toBeDefined();
            expect(state.location?.x).toBe(loation.x);
            expect(state.location?.y).toBe(loation.y);
        });
    });
});
