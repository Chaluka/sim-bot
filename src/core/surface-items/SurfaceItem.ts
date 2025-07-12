import { Location } from './Location';
import { ItemState } from './ItemState';

export interface SurfaceItem {
    id: string;
    location: Location;
    place(location: Location): void;
    report(): ItemState;
}
