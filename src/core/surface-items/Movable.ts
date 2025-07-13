import { Location } from './Location';

export interface Movable {
    move(): void;
    nextMove(): Location;
}
