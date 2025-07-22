import { Location } from './Location';

export interface Autonomous {
    /**
     * Gets the next location to which the item will move.
     */
    findPath(location: Location): Location[] | null;
}
