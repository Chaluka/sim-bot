import { GridUtils } from '../../utils';
import { SurfaceItem, Location } from '../surface-items';
import { Dimensions } from './Dimensions';
import { Surface } from './Surface';
import { SurfaceError, SurfaceErrors } from './SurfaceErrors';

export abstract class BaseSurface implements Surface {
    protected _surfaceItems: Map<string, SurfaceItem>;
    protected _grid: string[][] = [];
    private static readonly DEFAULT_MARKER = '0';

    constructor(protected _dimensions: Dimensions) {
        this._surfaceItems = new Map<string, SurfaceItem>();
        this._grid = GridUtils.initializeGrid<string>(
            this._dimensions.width,
            this._dimensions.height,
            BaseSurface.DEFAULT_MARKER
        );
    }

    public get dimensions(): Dimensions {
        return this._dimensions;
    }
    public get surfaceItems(): Map<string, SurfaceItem> {
        return this._surfaceItems;
    }

    public getItem(id: string): SurfaceItem | null {
        return this._surfaceItems.get(id) || null;
    }

    public placeItem(item: SurfaceItem): void {
        if (!this.isLocationValid(item.location)) {
            throw new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_OUT_OF_BOUNDS);
        }

        const isOccupiedByDifferentItem =
            this.isLocationOccupied(item.location) && this.getLocationMarker(item.location) !== item.id;

        // If the location is occupied by another item, reject
        if (isOccupiedByDifferentItem) {
            throw new SurfaceError(SurfaceErrors.INVALID_PLACEMENT_ALREADY_OCCUPIED);
        }

        // If the item was already placed, free its old location
        const existingItem = this.getItem(item.id);
        if (existingItem) {
            this.markLocationFree(existingItem.location);
        }

        this._surfaceItems.set(item.id, item);
        this.markLocationOccupied(item.location, item.id);
    }

    public removeItem(id: string): void {
        if (!this._surfaceItems.has(id)) {
            throw new SurfaceError(SurfaceErrors.ITEM_NOT_FOUND);
        }
        const item = this._surfaceItems.get(id);
        this.markLocationFree(item!.location);
        this._surfaceItems.delete(id);
    }

    public isValidPlacement(location: Location): boolean {
        return this.isLocationValid(location) && !this.isLocationOccupied(location);
    }

    private markLocationOccupied(location: Location, itemId: string): void {
        this._grid[location.x][location.y] = itemId;
    }

    private markLocationFree(location: Location): void {
        this._grid[location.x][location.y] = BaseSurface.DEFAULT_MARKER;
    }

    protected getLocationMarker(location: Location): string {
        return this._grid[location.x][location.y];
    }

    protected isLocationValid(location: Location): boolean {
        return this._dimensions.isWithinBoundary(location.x, location.y);
    }

    protected isLocationOccupied(location: Location): boolean {
        return this.getLocationMarker(location) !== BaseSurface.DEFAULT_MARKER;
    }
}
