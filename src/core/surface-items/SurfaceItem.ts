import { Location } from './Location';
import { ItemState } from './ItemState';
import { Direction } from './Direction';

export interface SurfaceItem {
    id: string;
    location: Location;
    direction: Direction;
    report(): ItemState;
}
