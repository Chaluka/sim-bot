import { Direction, Movable, Rotatable, SurfaceItem } from '../../core/surface-items';

export class SurfaceItemTestHelper {
    public static createMockSurfaceItem(id: string, x: number, y: number, direction: Direction): SurfaceItem {
        return {
            id,
            location: { x, y },
            direction,
            report: jest.fn(),
        };
    }

    public static createMockMovableRotatableSurfaceItem(
        id: string,
        x: number,
        y: number,
        direction: Direction
    ): SurfaceItem & Movable & Rotatable {
        return {
            ...this.createMockSurfaceItem(id, x, y, direction),
            nextMove: jest.fn(),
            rotate: jest.fn(),
            move: jest.fn(),
        };
    }
}
