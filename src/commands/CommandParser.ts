import { Direction } from '../core/surface-items';
import { Command } from './Command';
import { CommandType } from './CommandType';

export class CommandParser {
    public static readonly FORMAT_ERROR_MESSAGE = `Error parsing command`;

    public static parse(input: string): Command {
        const cleansedInput = input.trim();

        const placeCommandMatch = cleansedInput.match(this.buildPlaceCommandRegex());
        if (placeCommandMatch) {
            return this.parsePlaceCommand(placeCommandMatch);
        }

        const commandMatch = cleansedInput.match(this.buildOtherCommandRegex());
        if (commandMatch) {
            return {
                type: commandMatch[1] as CommandType,
            };
        }

        throw new CommandParserError(this.FORMAT_ERROR_MESSAGE);
    }

    private static parsePlaceCommand(match: RegExpMatchArray) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        const direction = match[3] as unknown as Direction;
        return {
            type: CommandType.PLACE,
            location: { x, y },
            direction,
        };
    }

    private static buildPlaceCommandRegex() {
        const directions = Object.values(Direction).join('|');
        return new RegExp(`^PLACE\\s+(\\d+),(\\d+),(${directions})$`); // RegExp('', 'i') case-insensitive
    }

    private static buildOtherCommandRegex() {
        const commands = Object.values(CommandType)
            .filter((c) => c != CommandType.PLACE)
            .join('|');
        return new RegExp(`^(${commands})$`);
    }
}

export class CommandParserError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CommandParserError.prototype);
        this.name = 'CommandParserError';
    }
}
