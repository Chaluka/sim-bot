import { Dimensions, SurfaceType } from '../core/surfaces';
import { UserInterface } from './io';

export interface AppConfigs {
    surfaceType: SurfaceType;
    dimensions: Dimensions;
    userInterface: UserInterface;
}
