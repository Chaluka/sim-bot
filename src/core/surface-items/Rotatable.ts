import { Rotation } from './Rotation';

export interface Rotatable {
    rotate(rotation: Rotation): void;
}
