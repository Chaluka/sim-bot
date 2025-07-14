import { Location } from './Location';

export interface Movable {
    nextMove(): Location | null;
}
