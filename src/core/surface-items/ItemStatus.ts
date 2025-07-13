import { Direction } from './Direction';
import { Location } from './Location';

export interface ItemStatus {
    id: string;
    location: Location;
    direction?: Direction;
}
