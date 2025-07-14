import { BaseSurfaceItem } from './BaseSurfaceItem';
import { Movable } from './Movable';
import { Direction } from './Direction';
import { Location } from './Location';
import { ItemStatus } from './ItemStatus';
import { Rotatable } from './Rotatable';
import { Rotation } from './Rotation';
import { SurfaceItemUtil } from './utils/SurfaceItemUtil';
import { Surface } from '../surfaces';

export class Robot extends BaseSurfaceItem implements Movable, Rotatable {
    constructor(
        id: string,
        direction: Direction,
        surface?: Surface,
        private _step: number = 1
    ) {
        super(id, direction, surface);
    }

    public rotate(rotation: Rotation): void {
        this._direction = SurfaceItemUtil.rotate(this._direction, rotation);
    }

    public report(): ItemStatus {
        return {
            id: this._id,
            location: this.location,
            direction: this._direction,
        };
    }

    public nextMove(): Location | null {
        if (!this.location) {
            return null;
        }

        const { x, y } = this.location!;
        switch (this._direction) {
            case Direction.NORTH:
                return { x, y: y + this._step };
            case Direction.SOUTH:
                return { x, y: y - this._step };
            case Direction.EAST:
                return { x: x + this._step, y };
            case Direction.WEST:
                return { x: x - this._step, y };
            default:
                throw new Error(`Unknown direction: ${this._direction}`);
        }
    }
}
