import { Command } from './Command';

export interface CommandParser {
    /**
     * Parses the input string into a Command object.
     *
     * @param input - A string representing a command (e.g., "PLACE 1,2,NORTH", "MOVE", "REPORT").
     * @returns A Command object representing the parsed input.
     * @throws {CommandParserError} If the input is invalid or cannot be parsed.
     */
    parse(input: string): Command;
}
