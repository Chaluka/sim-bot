import { ItemState } from './ItemState';
import { SurfaceItem } from './SurfaceItem';
import { Location } from './Location';
import { Direction } from './Direction';

export abstract class BaseSurfaceItem implements SurfaceItem {
    constructor(
        protected _id: string,
        protected _location: Location,
        protected _direction: Direction = Direction.NORTH
    ) {}

    public get id(): string {
        return this._id;
    }

    public get location(): Location {
        return this._location;
    }

    public set location(newLocation: Location) {
        this._location = newLocation;
    }

    public get direction(): Direction {
        return this._direction;
    }

    public set direction(newDirection: Direction) {
        this._direction = newDirection;
    }

    abstract report(): ItemState;
}
