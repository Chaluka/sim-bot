import { Direction, Location } from '../core/surface-items';
import { Command } from './Command';
import { CommandType } from './CommandType';

export interface PlaceCommand extends Command {
    type: CommandType.PLACE;
    location: Location;
    direction: Direction;
}
