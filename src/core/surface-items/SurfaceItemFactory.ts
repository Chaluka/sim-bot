import { Direction } from './Direction';
import { SurfaceItem } from './SurfaceItem';
import { Location } from './Location';

export enum SurfaceItemType {
    ROBOT = 'ROBOT',
    OBSTACLE = 'OBSTACLE',
}

export interface SurfaceItemFactory {
    create(type: SurfaceItemType, id: string, location: Location, direction: Direction, step?: number): SurfaceItem;
}
