import { BaseSurfaceItem } from './BaseSurfaceItem';
import { Movable } from './Movable';
import { Direction } from './Direction';
import { Location } from './Location';
import { ItemState } from './ItemState';
import { Rotatable } from './Rotatable';
import { Rotation } from './Rotation';
import { SurfaceItemUtil } from './utils/SurfaceItemUtil';

export class Robot extends BaseSurfaceItem implements Movable, Rotatable {
    constructor(
        id: string,
        location: Location,
        direction: Direction,
        private _step: number = 1
    ) {
        super(id, location, direction);
    }

    public move(): void {
        this._location = this.nextMove();
    }

    public rotate(rotation: Rotation): void {
        this._direction = SurfaceItemUtil.rotate(this._direction, rotation);
    }

    public report(): ItemState {
        return {
            id: this._id,
            location: this._location,
            direction: this._direction,
        };
    }

    public nextMove(): Location {
        const { x, y } = this._location;

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
