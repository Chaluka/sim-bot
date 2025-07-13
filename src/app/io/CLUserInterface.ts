import { CommandExecutionResult, CommandType } from '../../commands';
import { UserInterface } from './UserInterface';
import readline from 'readline';

export class CLUserInterface implements UserInterface {
    private readonly readline: readline.Interface;

    public constructor(private _vorbose: boolean = false) {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    public prompt(callback: (input: string) => CommandExecutionResult): void {
        this.readline.question('Command: ', (input) => {
            const result = callback(input);
            if (result.success && result.command === CommandType.REPORT) {
                const output = this.format(result);
                console.log(output);
            }
            this.prompt(callback);
        });
    }

    public format(result: CommandExecutionResult): string {
        const { itemStatus } = result;
        return `Output : ${itemStatus?.location.x},${itemStatus?.location.y},${itemStatus?.direction}`;
    }
}
