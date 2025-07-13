import { CommandExecutionResult } from '../../commands';

export interface UserInterface {
    prompt(callback: (input: string) => CommandExecutionResult): void;
    format(output: CommandExecutionResult): string;
}
