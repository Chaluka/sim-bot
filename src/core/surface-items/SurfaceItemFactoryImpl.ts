import { Surface } from '../surfaces';
import { Direction } from './Direction';
import { Robot } from './Robot';
import { SurfaceItem } from './SurfaceItem';
import { SurfaceItemFactory, SurfaceItemType } from './SurfaceItemFactory';

export class SurfaceItemFactoryImpl implements SurfaceItemFactory {
    create(type: SurfaceItemType, id: string, direction: Direction, surface?: Surface, step?: number): SurfaceItem {
        switch (type) {
            case SurfaceItemType.ROBOT:
                return new Robot(id, direction, surface, step);
            default:
                throw new Error(`Unknown surface item type: ${type}`);
        }
    }
}
