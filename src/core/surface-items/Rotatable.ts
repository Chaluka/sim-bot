import { Rotation } from './Rotation';

export interface Rotatable {
    /**
     * Rorate the item as per given rotation
     */
    rotate(rotation: Rotation): void;
}
