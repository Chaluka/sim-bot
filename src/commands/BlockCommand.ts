import { Location } from '../core/surface-items';
import { Command } from './Command';
import { CommandType } from './CommandType';

export interface BlockCommand extends Command {
    type: CommandType.BLOCK;
    location: Location;
}
