import { Direction } from './Direction';
import { Location } from './Location';

export interface ItemState {
    id: string;
    location: Location;
    direction?: Direction;
}
