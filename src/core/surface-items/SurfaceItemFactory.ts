import { Direction } from './Direction';
import { SurfaceItem } from './SurfaceItem';
import { Surface } from '../surfaces';

export enum SurfaceItemType {
    ROBOT = 'ROBOT',
    OBSTACLE = 'OBSTACLE',
}

export interface SurfaceItemFactory {
    /**
     * Create {@link SurfaceItem} base on the user input
     * @param type Type of the surface item
     * @param id Unique id of the surface item
     * @param direction Direction of the item on the surface
     * @param surface Surface that user want to place this item
     * @param step Number of cells that the item moves for single move
     */
    create(type: SurfaceItemType, id: string, direction: Direction, surface?: Surface, step?: number): SurfaceItem;
}
