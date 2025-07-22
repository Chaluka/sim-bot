import { Command, CommandExecutor, CommandParser, CommandType } from '../../commands';
import { Direction, SurfaceItem, SurfaceItemFactory, SurfaceItemType } from '../../core/surface-items';
import { Dimensions, Surface, SurfaceType } from '../../core/surfaces';
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
    private _surface: Surface | null;
    private _surfaceItemFactory: SurfaceItemFactory;
    private _parser: CommandParser;

    private static readonly ENTITY_ID = 'robot_1'; // Example entity ID, can be customized

    constructor(private _configs: SessionConfigs) {
        this._sessionId = uuidv4();
        this._userInterface = _configs.userInterface;
        this._executor = null;
        this._surface = null;
        this._surfaceItemFactory = _configs.surfaceItemFactory;
        this._parser = _configs.commandParser;
    }

    public run(): void {
        if (!this._userInterface) {
            throw Error('Session Error');
        }
        this.initializeCommandExecutor();
        this._status = SessionStatus.ACTIVE;
        this._userInterface.showMenu();
        this._userInterface.prompt((input) => {
            const command = this._parser.parse(input);
            const item = this.getItem(command);
            return this._executor!.execute(item, command);
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
        this._surface = this._configs.surfaceFactory.create(SurfaceType.TABLE_TOP, new Dimensions(5, 5));
        this._executor = new CommandExecutor(this._surface);
    }

    private getItem(command: Command): SurfaceItem | null {
        if (command.type === CommandType.BLOCK) {
            return this._surfaceItemFactory.create(SurfaceItemType.BLOCK, uuidv4(), this._surface!);
        }

        const item = this._surface?.getItem(SessionImpl.ENTITY_ID);
        if (!item && command.type === CommandType.PLACE) {
            return this._surfaceItemFactory.create(SurfaceItemType.ROBOT, SessionImpl.ENTITY_ID, this._surface!);
        }

        return item!;
    }
}
