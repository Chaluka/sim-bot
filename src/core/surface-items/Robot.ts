import { BaseSurfaceItem } from './BaseSurfaceItem';
import { Movable } from './Movable';
import { Direction } from './Direction';
import { Location } from './Location';
import { ItemStatus } from './ItemStatus';
import { Rotatable } from './Rotatable';
import { Rotation } from './Rotation';
import { SurfaceItemUtil } from './utils/SurfaceItemUtil';
import { Surface } from '../surfaces';
import { Autonomous } from './Autonomous';
import { GridUtils } from '../../utils';

export class Robot extends BaseSurfaceItem implements Movable, Rotatable, Autonomous {
    constructor(
        id: string,
        direction: Direction,
        surface?: Surface,
        private _step: number = 1
    ) {
        super(id, direction, surface);
    }

    public findPath(location: Location): Location[] | null {
        console.log('path find starts');

        const currentLocation = this.location!;
        const dimensions = this._surface?.getDimensions();
        const visted = GridUtils.initializeGrid(dimensions?.width!, dimensions?.height!, 0);
        const parent = GridUtils.initializeGrid(dimensions?.width!, dimensions?.height!, { x: -1, y: -1 } as Location);
        const queue: Location[] = [currentLocation];
        visted[currentLocation.x][currentLocation.y] = 1;

        while (queue.length != 0) {
            const current: Location = queue.shift()!;

            if (location.x === current.x && location.y === current.y) {
                const path = [];
                let cur: Location | null = location;
                while (cur && (cur.x !== currentLocation.x || cur.y !== currentLocation.y)) {
                    path.push({ ...cur });
                    cur = parent[cur.x][cur.y];
                    console.log(cur);
                }
                if (cur) {
                    path.push(currentLocation);
                }
                return path.reverse();
            }

            for (let u of this.getNeighbours(current)) {
                if (!visted[u.x][u.y]) {
                    queue.push(u);
                    parent[u.x][u.y] = current;
                    visted[current.x][current.y] = 1;
                }
            }
        }

        return null;
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
        return this.getLocationbasedOnDirection(x, y, this.direction);
    }

    private getLocationbasedOnDirection(x: number, y: number, direction: Direction): Location {
        switch (direction) {
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

    private getNeighbours(location: Location) {
        const neighborus = [];
        for (let [_, direction] of Object.entries(Direction)) {
            const nextlocation = this.getLocationbasedOnDirection(location.x, location.y, direction);
            if (this._surface?.isValidPlacement(nextlocation)) {
                neighborus.push(nextlocation);
            }
        }
        return neighborus;
    }
}
