import { SurfaceItem, Location } from '../surface-items';

export interface Surface {
    /**
     * Get the surface item by id.
     * @param id 
     */
    getItem(id: string): SurfaceItem | null;

    /**
     * Get the location of a surface item by it's id.
     * @param id 
     */
    getItemLocation(id: string): Location | null;

    /**
     * Places the given item on the surface at the specified location.
     * @param item Item to place
     * @param location The (x, y) coordinates on the surface
     */
    placeItem(item: SurfaceItem, location: Location): void;

    /**
     * Remove an item from the surface
     * @param id 
     */
    removeItem(id: string): void;

    /**
     * Check the given location is valid position to place an item
     * @param location The (x, y) coordinates on the surface
     */
    isValidPlacement(location: Location): boolean;
}
