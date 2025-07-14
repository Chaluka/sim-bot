import { UserInterface } from '../../src/app/io/UserInterface';
import { CommandExecutionResult, CommandType } from '../../src/commands';
import { CommandTestArgs } from './CommandTestArgs';

export default class TestUserInterface implements UserInterface {
    constructor(private _test: CommandTestArgs) {}
    prompt(callback: (input: string) => CommandExecutionResult): void {
        const { commands, output } = this._test;
        for (let command of commands) {
            const result = callback(command);
            expect(result.success).toBeTruthy();
            expect(result.command).toBeDefined();
            if (result.command === CommandType.REPORT) {
                const actualOutput = this.format(result);
                expect(actualOutput).toBe(output);
                return;
            }
        }
    }

    public format(result: CommandExecutionResult): string {
        const { itemStatus, ..._ } = result;
        return `${itemStatus?.location?.x},${itemStatus?.location?.y},${itemStatus?.direction}`;
    }
}
