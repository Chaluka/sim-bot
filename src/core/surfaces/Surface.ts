import { SurfaceItem, Location } from '../surface-items';
import { Dimensions } from './Dimensions';

export interface Surface {
    getItem(id: string): SurfaceItem | null;
    placeItem(item: SurfaceItem): void;
    removeItem(id: string): void;
    isValidPlacement(location: Location): boolean;
}
