import { Direction, SurfaceItem, Location } from '../../../core/surface-items';
import { SurfaceError, SurfaceErrors } from '../../../core/surfaces';
import { SurfaceItemTestHelper } from '../../helpers/SurfaceItemTestHelper';
import { SurfaceTestHelper, TestSurface } from '../../helpers/SurfaceTestHelper';

describe('BaseSurface', () => {
    let surface: TestSurface;
    let surfaceItem: SurfaceItem;

    beforeEach(() => {
        surface = SurfaceTestHelper.createTestSurface(5, 10);
        surfaceItem = SurfaceItemTestHelper.createMockSurfaceItem('item1', Direction.SOUTH, surface);
    });

    describe('placeItem', () => {
        it('should plcae an item on the surface', () => {
            // Assign
            const location = { x: 1, y: 4 };
            //
            surface.placeItem(surfaceItem, location);
            expect(surface.getItem(surfaceItem.id)).toBe(surfaceItem);
            // Assert
            // Check if the location is marked as occupied
            expect(surface.hasItemPlaced(surfaceItem, location)).toBe(true);
        });

        it('should replace an existing item at the same location', () => {
            // Arrange
            const location = { x: 0, y: 3 };
            surface.placeItem(surfaceItem, location);

            // Act
            const newItem = SurfaceItemTestHelper.createMockSurfaceItem('item1', Direction.SOUTH, surface);
            surface.placeItem(newItem, location);
            // Assert
            expect(surface.hasItemPlaced(newItem, location)).toBe(true);
        });

        it('should throw an error if placement is out of bounds', () => {
            // Arrange
            const location = { x: 6, y: 10 }; // Out of bounds
            // Act & Assert
            const error = new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_OUT_OF_BOUNDS);
            expect(() => surface.placeItem(surfaceItem, location)).toThrow(error);
        });

        it('should throw an error if placement is invalid', () => {
            // Arrange
            const location = { x: 1, y: 3 };
            surface.placeItem(surfaceItem, location);
            const newItem = SurfaceItemTestHelper.createMockSurfaceItem('item2', Direction.SOUTH, surface);
            // Act & Assert
            const error = new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_ALREADY_OCCUPIED);
            expect(() => surface.placeItem(newItem, location)).toThrow(error);
        });
    });

    describe('removeItem', () => {
        it('should remove an item from the surface', () => {
            // Arrange
            const location = { x: 1, y: 3 };
            surface.placeItem(surfaceItem, location);
            // Act
            surface.removeItem(surfaceItem.id);
            // Assert
            expect(surface.getItem(surfaceItem.id)).toBeNull();
            expect(surface.hasItemPlaced(surfaceItem, location)).toBe(false);
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
            const location = { x: 1, y: 3 };
            surface.placeItem(surfaceItem, location);
            // Act
            const item = surface.getItem(surfaceItem.id);
            // Assert
            expect(item).toEqual(surfaceItem);
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
            surface.placeItem(surfaceItem, location);
            // Act
            const isValid = surface.isValidPlacement(location);
            // Assert
            expect(isValid).toBe(false);
        });
    });
});
