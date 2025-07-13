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
            const { success, command, ...rest } = callback(input);
            if (success && command === CommandType.REPORT) {
                const { itemStatus, ..._ } = rest;
                console.log(`Output : ${itemStatus?.location.x},${itemStatus?.location.y},${itemStatus?.direction}`);
            }
            this.prompt(callback);
        });
    }
}
