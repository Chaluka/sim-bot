import { Direction } from './Direction';
import { Location } from './Location';
import { Robot } from './Robot';
import { SurfaceItem } from './SurfaceItem';
import { SurfaceItemFactory, SurfaceItemType } from './SurfaceItemFactory';

export class SurfaceItemFactoryImpl implements SurfaceItemFactory {
    create(type: SurfaceItemType, id: string, location: Location, direction: Direction, step?: number): SurfaceItem {
        switch (type) {
            case SurfaceItemType.ROBOT:
                return new Robot(id, location, direction, step);
            default:
                throw new Error(`Unknown surface item type: ${type}`);
        }
    }
}
