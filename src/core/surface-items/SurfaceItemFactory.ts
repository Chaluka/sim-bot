import { Direction } from './Direction';
import { SurfaceItem } from './SurfaceItem';
import { Surface } from '../surfaces';

export enum SurfaceItemType {
    ROBOT = 'ROBOT',
    OBSTACLE = 'OBSTACLE',
}

export interface SurfaceItemFactory {
    create(type: SurfaceItemType, id: string, direction: Direction, surface?: Surface, step?: number): SurfaceItem;
}
