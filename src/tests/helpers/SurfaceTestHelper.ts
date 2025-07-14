import { SurfaceItem, Location } from '../../core/surface-items';
import { BaseSurface, Dimensions, Surface } from '../../core/surfaces';
import { TestHelperUtil } from './TestHelperUtil';

export class SurfaceTestHelper {
    public static createTestSurface(width: number, height: number) {
        return new TestSurface(new Dimensions(width, height));
    }

    public static createMockSurface(): Surface {
        return {
            getItem: jest.fn(),
            getItemLocation: jest.fn().mockReturnValue({ x: 0, y: 0 }),
            placeItem: jest.fn(),
            removeItem: jest.fn(),
            isValidPlacement: jest.fn(),
        };
    }
}

export class TestSurface extends BaseSurface {
    public hasItemPlaced(item: SurfaceItem, location: Location): boolean {
        const isItemExists = this.getItem(item.id) !== null;
        const isItemLocationCorrect = item.location != null && TestHelperUtil.isSameLocation(item.location, location);
        const isItemMarkedOnGrid = item.location != null && this.getLocationMarker(item.location) === item.id;
        return isItemExists && isItemLocationCorrect && isItemMarkedOnGrid;
    }
}
