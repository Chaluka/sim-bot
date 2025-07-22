import { Location } from '../core/surface-items';
import { Command } from './Command';
import { CommandType } from './CommandType';

export interface FindCommand extends Command {
    type: CommandType.FIND;
    location: Location;
}
