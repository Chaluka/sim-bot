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

    public showMenu(): void {
        console.log('\n======== TOY ROBOT SIMULATOR ===========');
        console.log('Commands:');
        console.log('  PLACE X,Y,FACING  - Place robot on the board (E.g. PLACE 0,0,NORTH)');
        console.log('  MOVE              - Move one step forward in the current direction');
        console.log('  LEFT              - Rotate 90° to the left');
        console.log('  RIGHT             - Rotate 90° to the right');
        console.log('  REPORT            - Show current location and direction');
    }

    public prompt(callback: (input: string) => CommandExecutionResult): void {
        this.readline.question('Command: ', (input) => {
            const result = callback(input);
            this.display(result);
            this.prompt(callback);
        });
    }

    public display(output: CommandExecutionResult) {
        if (output.success && (this._vorbose || output.command == CommandType.REPORT)) {
            console.log(this.format(output));
        }
    }

    private format(result: CommandExecutionResult): string {
        const { itemStatus } = result;
        return `Output : ${itemStatus?.location?.x},${itemStatus?.location?.y},${itemStatus?.direction}`;
    }
}
