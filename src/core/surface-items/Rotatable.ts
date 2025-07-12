import { Rotation } from './Rotation';

import { Direction } from './Direction';

export interface Rotatable {
    direction: Direction;
    rotate(rotation: Rotation): void;
}
