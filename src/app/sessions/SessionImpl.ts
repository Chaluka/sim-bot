import { CommandExecutor } from '../../commands';
import { Dimensions, SurfaceType } from '../../core/surfaces';
import { UserInterface } from '../io';
import { Session } from './Session';
import { SessionStatus } from './SessionStatus';
import { SessionConfigs } from './SesstionConfigs';
import { v4 as uuidv4 } from 'uuid';

export class SessionImpl implements Session {
    private _status = SessionStatus.INACTIVE;
    private _executor: CommandExecutor | null;
    private _sessionId: string;
    private _userInterface: UserInterface;

    constructor(private _configs: SessionConfigs) {
        this._sessionId = uuidv4();
        this._userInterface = _configs.userInterface;
        this._executor = null;
    }

    public run(): void {
        if (!this._userInterface) {
            throw Error('Session Error');
        }
        this.initializeCommandExecutor();
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

    private initializeCommandExecutor() {
        const surface = this._configs.surfaceFactory.create(SurfaceType.TABLE_TOP, new Dimensions(5, 5));
        this._executor = new CommandExecutor(surface, this._configs.surfaceItemFactory, this._configs.commandParser);
    }
}
