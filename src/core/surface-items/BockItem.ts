import { BaseSurfaceItem } from './BaseSurfaceItem';
import { ItemStatus } from './ItemStatus';

export class BlockItem extends BaseSurfaceItem {
    report(): ItemStatus {
        throw new Error('Method not implemented.');
    }
}
