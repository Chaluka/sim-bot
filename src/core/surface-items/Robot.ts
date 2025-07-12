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
        private _direction: Direction,
        private _step: number = 1
    ) {
        super(id, location);
    }

    public get direction(): Direction {
        return this._direction;
    }

    public get step(): number {
        return this._step;
    }

    public move(): void {
        this._location = this.getNextLocation();
    }

    public rotate(rotation: Rotation): void {
        this._direction = SurfaceItemUtil.rotate(this._direction, rotation);
    }

    public report(): ItemState {
        return {
            id: this.id,
            location: this.location,
            direction: this.direction,
        };
    }

    public getNextLocation(): Location {
        const { x, y } = this.location;

        switch (this.direction) {
            case Direction.NORTH:
                return { x, y: y + this.step };
            case Direction.SOUTH:
                return { x, y: y - this.step };
            case Direction.EAST:
                return { x: x + this.step, y };
            case Direction.WEST:
                return { x: x - this.step, y };
            default:
                throw new Error(`Unknown direction: ${this.direction}`);
        }
    }
}
