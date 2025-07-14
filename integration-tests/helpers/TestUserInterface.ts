import { UserInterface } from '../../src/app/io/UserInterface';
import { CommandExecutionResult, CommandType } from '../../src/commands';
import { CommandTestArgs } from './CommandTestArgs';

export default class TestUserInterface implements UserInterface {
    constructor(private _test: CommandTestArgs) {}

    display(output: CommandExecutionResult): void {}

    showMenu(): void {}

    prompt(callback: (input: string) => CommandExecutionResult): void {
        const { commands, output } = this._test;
        let finalSuccesResult: CommandExecutionResult | null = null;

        for (let command of commands) {
            const result = callback(command);
            if (result.success) {
                finalSuccesResult = { ...result };
            }
        }

        const cleansedOutput = output.trim();
        if (cleansedOutput) {
            const actualOutput = this.format(finalSuccesResult);
            expect(actualOutput).toBe(cleansedOutput);
        } else {
            expect(finalSuccesResult).toBeNull();
        }
    }

    private format(result: CommandExecutionResult | null): string | null {
        if (!result) {
            return null;
        }
        const { itemStatus, ..._ } = result;
        return `${itemStatus?.location?.x},${itemStatus?.location?.y},${itemStatus?.direction}`;
    }
}
