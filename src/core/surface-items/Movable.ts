import { Location } from './Location';

export interface Movable {
    /**
     * Gets the next location to which the item will move.
     */
    nextMove(): Location | null;
}
