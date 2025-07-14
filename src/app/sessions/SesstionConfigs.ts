import { CommandParser } from '../../commands';
import { SurfaceItemFactory } from '../../core/surface-items';
import { SurfaceFactory } from '../../core/surfaces';
import { UserInterface } from '../io';

export interface SessionConfigs {
    surfaceFactory: SurfaceFactory;
    surfaceItemFactory: SurfaceItemFactory;
    userInterface: UserInterface;
    commandParser: CommandParser;
}
