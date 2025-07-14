import { UserInterface } from '../../src/app/io/UserInterface';
import { CommandExecutionResult, CommandType } from '../../src/commands';
import { CommandTestArgs } from './CommandTestArgs';

export default class TestUserInterface implements UserInterface {
    constructor(private _test: CommandTestArgs) {}
    display(output: CommandExecutionResult): void {}
    showMenu(): void {}
    prompt(callback: (input: string) => CommandExecutionResult): void {
        const { commands, output } = this._test;
        let finalSuccesResult: CommandExecutionResult = {
            success: false,
            command: undefined,
            itemStatus: undefined,
        };

        for (let command of commands) {
            const result = callback(command);
            expect(result.success).toBeTruthy();
            expect(result.command).toBeDefined();

            if (result.success) {
                finalSuccesResult = { ...result };
            }
        }

        if (finalSuccesResult) {
            const actualOutput = this.format(finalSuccesResult);
            expect(actualOutput).toBe(output);
        } else {
            throw new Error('No command was executed, result is undefined.');
        }
    }

    public format(result: CommandExecutionResult): string {
        const { itemStatus, ..._ } = result;
        return `${itemStatus?.location?.x},${itemStatus?.location?.y},${itemStatus?.direction}`;
    }
}
