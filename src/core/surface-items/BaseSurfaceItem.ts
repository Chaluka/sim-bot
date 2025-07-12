import { ItemState } from './ItemState';
import { SurfaceItem } from './SurfaceItem';
import { Location } from './Location';

export abstract class BaseSurfaceItem implements SurfaceItem {
    constructor(
        protected _id: string,
        protected _location: Location
    ) {}

    public get id(): string {
        return this._id;
    }

    public get location(): Location {
        return this._location;
    }

    public place(location: Location): void {
        this._location = location;
    }

    abstract report(): ItemState;
}
