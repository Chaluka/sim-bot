import { CommandExecutionResult } from '../../commands';

export interface UserInterface {
    prompt(callback: (input: string) => CommandExecutionResult): void;
    display(output: CommandExecutionResult): void;
    showMenu(): void;
}
