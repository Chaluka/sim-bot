import { SurfaceItemFactory } from '../../core/surface-items';
import { Surface } from '../../core/surfaces';
import { UserInterface } from '../io';

export interface SessionConfigs {
    surface: Surface;
    surfaceItemFactory: SurfaceItemFactory;
    userInterface: UserInterface;
}
