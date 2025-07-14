import { Direction, Movable, Rotatable, SurfaceItem, SurfaceItemFactory } from '../../core/surface-items';
import { Surface } from '../../core/surfaces';

export class SurfaceItemTestHelper {
    public static createMockSurfaceItem(id: string, direction: Direction, surface: Surface): jest.Mocked<SurfaceItem> {
        const mockItem = {
            id,
            location: { x: 0, y: 0 },
            direction,
            report: jest.fn(),
        };

        Object.defineProperty(mockItem, 'location', {
            get: () => surface.getItemLocation(id) ?? null,
        });

        return mockItem;
    }

    public static createMockMovableRotatableSurfaceItem(
        id: string,
        direction: Direction,
        surface: Surface
    ): jest.Mocked<SurfaceItem & Movable & Rotatable> {
        return {
            ...this.createMockSurfaceItem(id, direction, surface),
            nextMove: jest.fn(),
            rotate: jest.fn(),
        };
    }
}
