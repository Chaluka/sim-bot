import { Direction, Movable, Rotatable, SurfaceItem, Location } from '../../../core/surface-items';
import { BaseSurface, Dimensions, SurfaceError, SurfaceErrors } from '../../../core/surfaces';
import { SurfaceItemTestHelper } from '../../helpers/SurfaceItemTestHelper';

class BaseSurfaceTest extends BaseSurface {
    public isItemPlaced(item: SurfaceItem): boolean {
        return this.getItem(item.id) !== null && this.getLocationMarker(item.location) === item.id;
    }
}

describe('BaseSurface', () => {
    let surface: BaseSurfaceTest;
    let mockSurfaceItem: SurfaceItem & Movable & Rotatable;

    beforeEach(() => {
        surface = new BaseSurfaceTest(new Dimensions(5, 10));
        mockSurfaceItem = SurfaceItemTestHelper.createMockMovableRotatableSurfaceItem('item1', 0, 0, Direction.NORTH);
    });

    describe('placeItem', () => {
        it('should plcae an item on the surface', () => {
            // Assign & act
            surface.placeItem(mockSurfaceItem);
            expect(surface.getItem(mockSurfaceItem.id)).toBe(mockSurfaceItem);
            // Assert
            // Check if the location is marked as occupied
            expect(surface.isItemPlaced(mockSurfaceItem)).toBe(true);
        });

        it('should replace an existing item at the same location', () => {
            // Arrange
            const existingItem = SurfaceItemTestHelper.createMockSurfaceItem('item2', 0, 0, Direction.SOUTH);
            surface.placeItem(existingItem);
            // Act
            const newItem = { ...existingItem, direction: Direction.EAST };
            surface.placeItem(newItem);
            // Assert
            expect(surface.isItemPlaced(newItem)).toBe(true);
        });

        it('should throw an error if placement is out of bounds', () => {
            // Arrange
            mockSurfaceItem.location = { x: 6, y: 10 }; // Out of bounds
            // Act & Assert
            const error = new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_OUT_OF_BOUNDS);
            expect(() => surface.placeItem(mockSurfaceItem)).toThrow(error);
        });

        it('should throw an error if placement is invalid', () => {
            // Arrange
            surface.placeItem(mockSurfaceItem);
            const newItem = SurfaceItemTestHelper.createMockSurfaceItem('item2', 0, 0, Direction.SOUTH);
            // Act & Assert
            const error = new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_ALREADY_OCCUPIED);
            expect(() => surface.placeItem(newItem)).toThrow(error);
        });
    });

    describe('removeItem', () => {
        it('should remove an item from the surface', () => {
            // Arrange
            surface.placeItem(mockSurfaceItem);
            // Act
            surface.removeItem(mockSurfaceItem.id);
            // Assert
            expect(surface.getItem(mockSurfaceItem.id)).toBeNull();
            expect(surface.isItemPlaced(mockSurfaceItem)).toBe(false);
        });

        it('should throw an error if the item does not exist', () => {
            // Act & Assert
            const error = new SurfaceError(SurfaceErrors.ITEM_NOT_FOUND);
            expect(() => surface.removeItem('nonexistent')).toThrow(error);
        });
    });

    describe('getItem', () => {
        it('should return the item if it exists', () => {
            // Arrange
            surface.placeItem(mockSurfaceItem);
            // Act
            const item = surface.getItem(mockSurfaceItem.id);
            // Assert
            expect(item).toEqual(mockSurfaceItem);
        });

        it('should return null if the item does not exist', () => {
            // Act
            const item = surface.getItem('nonexistent');
            // Assert
            expect(item).toBeNull();
        });
    });

    describe('isValidPlacement', () => {
        it('should return true for a valid placement', () => {
            // Arrange
            const location: Location = { x: 1, y: 1 };
            // Act
            const isValid = surface.isValidPlacement(location);
            // Assert
            expect(isValid).toBe(true);
        });

        it('should return false for an out-of-bounds placement', () => {
            // Arrange
            const location: Location = { x: 6, y: 10 }; // Out of bounds
            // Act
            const isValid = surface.isValidPlacement(location);
            // Assert
            expect(isValid).toBe(false);
        });

        it('should return false for an occupied placement', () => {
            // Arrange
            const location: Location = { x: 0, y: 0 };
            surface.placeItem(mockSurfaceItem);
            // Act
            const isValid = surface.isValidPlacement(location);
            // Assert
            expect(isValid).toBe(false);
        });
    });
});
