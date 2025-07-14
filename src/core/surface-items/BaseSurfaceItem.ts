import { ItemStatus } from './ItemStatus';
import { SurfaceItem } from './SurfaceItem';
import { Location } from './Location';
import { Direction } from './Direction';
import { Surface } from '../surfaces';

export abstract class BaseSurfaceItem implements SurfaceItem {
    constructor(
        protected _id: string,
        protected _direction: Direction = Direction.NORTH,
        protected _surface?: Surface
    ) {}

    public get id(): string {
        return this._id;
    }

    public get location(): Location | null {
        return this._surface?.getItemLocation(this._id) ?? null;
    }

    public get direction(): Direction {
        return this._direction;
    }

    public set direction(newDirection: Direction) {
        this._direction = newDirection;
    }

    abstract report(): ItemStatus;
}
