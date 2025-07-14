import { CommandExecutionResult } from '../../commands';

export interface UserInterface {
    /**
     * Method that promtp the user
     * @param callback callback method to execute user commands
     */
    prompt(callback: (input: string) => CommandExecutionResult): void;

    /**
     * Display the outputs for user commands
     * @param output 
     */
    display(output: CommandExecutionResult): void;

    /**
     * Method to display the App menu or set of rules to begin.
     */
    showMenu(): void;
}
