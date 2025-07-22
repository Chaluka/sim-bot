import { Surface } from '../surfaces';
import { BlockItem } from './BockItem';
import { Direction } from './Direction';
import { Robot } from './Robot';
import { SurfaceItem } from './SurfaceItem';
import { SurfaceItemFactory, SurfaceItemType } from './SurfaceItemFactory';

export class SurfaceItemFactoryImpl implements SurfaceItemFactory {
    create(
        type: SurfaceItemType,
        id: string,
        surface?: Surface,
        direction: Direction = Direction.NORTH,
        step: number = 1
    ): SurfaceItem {
        switch (type) {
            case SurfaceItemType.ROBOT:
                return new Robot(id, direction, surface, step);
            case SurfaceItemType.BLOCK:
                return new BlockItem(id, direction, surface);
            default:
                throw new Error(`Unknown surface item type: ${type}`);
        }
    }
}
