import { SurfaceItemFactoryImpl } from '../core/surface-items';
import { SurfaceFactoryImpl } from '../core/surfaces';
import { AppConfigs } from './AppConfigs';
import { Session, SessionImpl } from './sessions';

export class SimulatorApp {
    private static _instance: SimulatorApp;
    private _session: Session | null;
    private constructor(private _configs: AppConfigs) {
        this._session = null;
    }

    public static getInstance(configs: AppConfigs): SimulatorApp {
        if (!SimulatorApp._instance) {
            SimulatorApp._instance = new SimulatorApp(configs);
        }
        return SimulatorApp._instance;
    }

    public run(): void {
        console.log('SimulatorApp is running :::');

        const surface = new SurfaceFactoryImpl().create(this._configs.surfaceType, this._configs.dimensions);
        this._session = new SessionImpl({
            surface,
            surfaceItemFactory: new SurfaceItemFactoryImpl(),
        });
        this._session.run();
    }
}
