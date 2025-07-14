import { Direction } from '../Direction';
import { Movable } from '../Movable';
import { Rotatable } from '../Rotatable';
import { Rotation } from '../Rotation';
import { SurfaceItem } from '../SurfaceItem';

export class SurfaceItemUtil {
    /**
     * Return the direction after performing the given rotaion (e.g. from NORTH to WEST after LEFT roration).
     * @param direction current direction
     * @param rotation expected rotation
     * @returns new direction 
     */
    public static rotate(direction: Direction, rotation: Rotation): Direction {
        const directions = Object.values(Direction);
        const index = directions.indexOf(direction);

        let offset = 1;
        if (rotation === Rotation.LEFT) {
            offset = directions.length - 1;
        }

        return directions[(index + offset) % directions.length];
    }

    /**
     * Returns whether the surface item is Movable type. 
     */
    public static isMovable(surfaceItem: SurfaceItem | null): surfaceItem is SurfaceItem & Movable {
        return surfaceItem !== null && 'nextMove' in surfaceItem && typeof surfaceItem.nextMove === 'function';
    }

    /**
     * Returns whether the surface item is Rotatable type. 
     */
    public static isRotatable(surfaceItem: SurfaceItem | null): surfaceItem is SurfaceItem & Rotatable {
        return surfaceItem !== null && 'rotate' in surfaceItem && typeof surfaceItem.rotate === 'function';
    }

    /**
     * Returns whether the surface item is Movable or Rotatable type. 
     */
    public static isMovableOrRotatable(
        surfaceItem: SurfaceItem | null
    ): surfaceItem is SurfaceItem & (Movable | Rotatable) {
        return this.isMovable(surfaceItem) || this.isRotatable(surfaceItem);
    }
}
