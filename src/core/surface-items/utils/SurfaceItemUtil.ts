import { Direction } from '../Direction';
import { Rotation } from '../Rotation';

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
}
