import { Direction } from './Direction';

export interface Movable {
    direction: Direction;
    step: number;
    move(): void;
}
