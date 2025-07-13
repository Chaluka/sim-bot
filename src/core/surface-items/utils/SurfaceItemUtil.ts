import { Direction } from '../Direction';
import { Movable } from '../Movable';
import { Rotatable } from '../Rotatable';
import { Rotation } from '../Rotation';
import { SurfaceItem } from '../SurfaceItem';

export class SurfaceItemUtil {
    public static rotate(direction: Direction, rotation: Rotation): Direction {
        const directions = Object.values(Direction);
        const index = directions.indexOf(direction);

        let offset = 1;
        if (rotation === Rotation.LEFT) {
            offset = directions.length - 1;
        }

        return directions[(index + offset) % directions.length];
    }

    public static isMovable(surfaceItem: SurfaceItem | null): surfaceItem is SurfaceItem & Movable {
        return surfaceItem !== null && 'move' in surfaceItem && typeof surfaceItem.move === 'function';
    }

    public static isRotatable(surfaceItem: SurfaceItem | null): surfaceItem is SurfaceItem & Rotatable {
        return surfaceItem !== null && 'rotate' in surfaceItem && typeof surfaceItem.rotate === 'function';
    }

    public static isMovableOrRotatable(
        surfaceItem: SurfaceItem | null
    ): surfaceItem is SurfaceItem & (Movable | Rotatable) {
        return this.isMovable(surfaceItem) || this.isRotatable(surfaceItem);
    }
}
