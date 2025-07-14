import { SurfaceItem, Location } from '../surface-items';

export interface Surface {
    getItem(id: string): SurfaceItem | null;
    getItemLocation(id: string): Location | null;
    placeItem(item: SurfaceItem, location: Location): void;
    removeItem(id: string): void;
    isValidPlacement(location: Location): boolean;
}
