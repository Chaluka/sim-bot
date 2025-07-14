import { CommandExecutor } from '../../commands';
import { UserInterface } from '../io';
import { Session } from './Session';
import { SessionStatus } from './SessionStatus';
import { SessionConfigs } from './SesstionConfigs';

export class SessionImpl implements Session {
    private _status = SessionStatus.INACTIVE;
    private _executor: CommandExecutor | null;
    private _sessionId: string;
    private _userInterface: UserInterface;

    constructor(configs: SessionConfigs) {
        this._executor = new CommandExecutor(configs.surface, configs.surfaceItemFactory, configs.commandParser);
        this._sessionId = this.generateSessionId();
        this._userInterface = configs.userInterface;
    }

    private generateSessionId(): string {
        return 'session-' + Math.random().toString(36).substring(2, 15);
    }

    public run(): void {
        if (!this._userInterface || !this._executor) {
            throw Error('Session Error');
        }
        this._status = SessionStatus.ACTIVE;
        this._userInterface.showMenu();
        this._userInterface.prompt((input) => {
            return this._executor!.execute(input);
        });
    }

    public stop(): void {
        this._status = SessionStatus.INACTIVE;
        console.log('BaseSession has been stopped');
    }

    public get status(): SessionStatus {
        return this._status;
    }
}
