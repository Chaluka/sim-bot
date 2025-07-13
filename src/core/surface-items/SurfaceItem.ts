import { Location } from './Location';
import { ItemStatus } from './ItemStatus';
import { Direction } from './Direction';

export interface SurfaceItem {
    id: string;
    location: Location;
    direction: Direction;
    report(): ItemStatus;
}
