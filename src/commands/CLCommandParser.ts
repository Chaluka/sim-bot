import { Direction } from '../core/surface-items';
import { Command } from './Command';
import { CommandParser } from './CommandParser';
import { CommandType } from './CommandType';

export class CLCommandParser implements CommandParser {
    public readonly FORMAT_ERROR_MESSAGE = `Error parsing command`;

    public parse(input: string): Command {
        const cleansedInput = input.trim();

        const placeCommandMatch = cleansedInput.match(this.buildPlaceCommandRegex());
        if (placeCommandMatch) {
            return this.parsePlaceCommand(placeCommandMatch);
        }

        const blockCommandMatch = cleansedInput.match(this.buildBlockCommandRegex());
        if (blockCommandMatch) {
            return this.parseBlockCommand(blockCommandMatch);
        }

        const findCommandMatch = cleansedInput.match(this.buildFindCommandRegex());
        if (findCommandMatch) {
            return this.parseFindCommand(findCommandMatch);
        }

        const commandMatch = cleansedInput.match(this.buildOtherCommandRegex());
        if (commandMatch) {
            return {
                type: commandMatch[1] as CommandType,
            };
        }

        throw new CommandParserError(this.FORMAT_ERROR_MESSAGE);
    }

    private parsePlaceCommand(match: RegExpMatchArray) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        const direction = match[3] as unknown as Direction;
        return {
            type: CommandType.PLACE,
            location: { x, y },
            direction,
        };
    }

    private buildPlaceCommandRegex() {
        const directions = Object.values(Direction).join('|');
        return new RegExp(`^PLACE\\s+(\\d+),(\\d+),(${directions})$`); // RegExp('', 'i') case-insensitive
    }

    private buildBlockCommandRegex() {
        return new RegExp(`^BLOCK\\s+(\\d+),(\\d+)$`); // RegExp('', 'i') case-insensitive
    }

    private parseBlockCommand(match: RegExpMatchArray) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        return {
            type: CommandType.BLOCK,
            location: { x, y },
        };
    }

    private buildFindCommandRegex() {
        return new RegExp(`^FIND\\s+(\\d+),(\\d+)$`); // RegExp('', 'i') case-insensitive
    }

    private parseFindCommand(match: RegExpMatchArray) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        return {
            type: CommandType.FIND,
            location: { x, y },
        };
    }

    private buildOtherCommandRegex() {
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
